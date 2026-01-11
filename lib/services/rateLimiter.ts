// ═══════════════════════════════════════════════════════════════════════════════
//                    RATE LIMITING & COST CONTROL
//                    Prevents API abuse and controls costs
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Rate limit configuration per source
 */
interface RateLimitConfig {
  maxRequests: number;      // Max requests per window
  windowMs: number;         // Time window in ms
  costPerRequest: number;   // Estimated cost in USD
  dailyBudget: number;      // Daily budget limit in USD
}

const SOURCE_LIMITS: Record<string, RateLimitConfig> = {
  wikipedia: {
    maxRequests: 200,
    windowMs: 60 * 1000,        // 200 requests per minute
    costPerRequest: 0,          // Free
    dailyBudget: Infinity,
  },
  musicbrainz: {
    maxRequests: 50,
    windowMs: 60 * 1000,        // 50 requests per minute (their limit)
    costPerRequest: 0,          // Free
    dailyBudget: Infinity,
  },
  genius: {
    maxRequests: 100,
    windowMs: 60 * 1000,        // 100 requests per minute
    costPerRequest: 0,          // Free tier
    dailyBudget: Infinity,
  },
  openai: {
    maxRequests: 60,
    windowMs: 60 * 1000,        // 60 requests per minute
    costPerRequest: 0.002,      // ~$0.002 per request (gpt-4o-mini)
    dailyBudget: 10,            // $10/day limit
  },
  websearch: {
    maxRequests: 100,
    windowMs: 60 * 1000,
    costPerRequest: 0.005,      // If using paid search API
    dailyBudget: 5,
  },
};

/**
 * Rate limiter with sliding window
 */
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private dailyCosts: Map<string, number> = new Map();
  private lastCostReset: number = Date.now();

  /**
   * Check if request is allowed
   */
  async checkLimit(source: string): Promise<{
    allowed: boolean;
    waitMs?: number;
    reason?: string;
  }> {
    const config = SOURCE_LIMITS[source];
    if (!config) {
      return { allowed: true };
    }

    const now = Date.now();
    const key = source;

    // Reset daily costs at midnight
    if (now - this.lastCostReset > 24 * 60 * 60 * 1000) {
      this.dailyCosts.clear();
      this.lastCostReset = now;
    }

    // Check daily budget
    const dailyCost = this.dailyCosts.get(source) || 0;
    if (dailyCost >= config.dailyBudget) {
      return {
        allowed: false,
        reason: `Daily budget exceeded for ${source}`,
      };
    }

    // Get request timestamps
    const timestamps = this.requests.get(key) || [];

    // Remove old timestamps outside window
    const windowStart = now - config.windowMs;
    const recentRequests = timestamps.filter(t => t > windowStart);

    // Check if limit exceeded
    if (recentRequests.length >= config.maxRequests) {
      const oldestInWindow = recentRequests[0];
      const waitMs = oldestInWindow + config.windowMs - now;

      return {
        allowed: false,
        waitMs,
        reason: `Rate limit exceeded for ${source}`,
      };
    }

    return { allowed: true };
  }

  /**
   * Record a request
   */
  recordRequest(source: string): void {
    const config = SOURCE_LIMITS[source];
    if (!config) return;

    const now = Date.now();
    const key = source;

    // Add timestamp
    const timestamps = this.requests.get(key) || [];
    timestamps.push(now);
    this.requests.set(key, timestamps);

    // Update daily cost
    const dailyCost = this.dailyCosts.get(source) || 0;
    this.dailyCosts.set(source, dailyCost + config.costPerRequest);

    // Cleanup old timestamps periodically
    if (timestamps.length > 1000) {
      const windowStart = now - config.windowMs;
      this.requests.set(key, timestamps.filter(t => t > windowStart));
    }
  }

  /**
   * Get current usage stats
   */
  getStats(): Record<string, {
    requestsInWindow: number;
    dailyCost: number;
    dailyBudget: number;
    utilizationPercent: number;
  }> {
    const now = Date.now();
    const stats: Record<string, any> = {};

    for (const [source, config] of Object.entries(SOURCE_LIMITS)) {
      const timestamps = this.requests.get(source) || [];
      const windowStart = now - config.windowMs;
      const recentRequests = timestamps.filter(t => t > windowStart);
      const dailyCost = this.dailyCosts.get(source) || 0;

      stats[source] = {
        requestsInWindow: recentRequests.length,
        maxRequests: config.maxRequests,
        dailyCost: dailyCost.toFixed(4),
        dailyBudget: config.dailyBudget,
        utilizationPercent: ((recentRequests.length / config.maxRequests) * 100).toFixed(1),
      };
    }

    return stats;
  }

  /**
   * Wait until rate limit allows
   */
  async waitForLimit(source: string): Promise<void> {
    const check = await this.checkLimit(source);

    if (!check.allowed && check.waitMs) {
      await new Promise(resolve => setTimeout(resolve, check.waitMs));
    }
  }

  /**
   * Get estimated daily cost
   */
  getDailyCost(): number {
    let total = 0;
    Array.from(this.dailyCosts.values()).forEach(cost => {
      total += cost;
    });
    return total;
  }

  /**
   * Reset all limits (for testing)
   */
  reset(): void {
    this.requests.clear();
    this.dailyCosts.clear();
    this.lastCostReset = Date.now();
  }
}

// Singleton instance
export const rateLimiter = new RateLimiter();

/**
 * Decorator for rate-limited functions
 */
export function withRateLimit(source: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      await rateLimiter.waitForLimit(source);

      try {
        const result = await originalMethod.apply(this, args);
        rateLimiter.recordRequest(source);
        return result;
      } catch (error) {
        rateLimiter.recordRequest(source); // Still count failed requests
        throw error;
      }
    };

    return descriptor;
  };
}
