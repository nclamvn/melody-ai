/**
 * Clean YouTube video title to extract actual song name
 * Removes channel names, separators, emojis, and other noise
 */
export function cleanSongTitle(rawTitle: string): string {
  if (!rawTitle) return "Unknown";

  let title = rawTitle;

  // Remove common YouTube title patterns
  const patternsToRemove = [
    // Separators and everything after them (usually channel/playlist names)
    /\s*[|｜]\s*.*/g,
    /\s*[❖✦★☆◆◇●○]\s*.*/g,
    /\s*[-–—]\s*[A-Z][^a-z].*/g, // Dash followed by uppercase (likely channel name)

    // Common suffixes
    /\s*\(?(Official\s*)?(Music\s*)?(Video|MV|Audio|Lyrics?|Visualizer|Live)\)?/gi,
    /\s*\[?(Official\s*)?(Music\s*)?(Video|MV|Audio|Lyrics?|Visualizer|Live)\]?/gi,
    /\s*【[^】]*】/g, // Japanese brackets
    /\s*\[[^\]]*\]/g, // Square brackets content
    /\s*\([^)]*(?:remix|cover|version|ver\.|acoustic|live|official|audio|video|mv|lyric)[^)]*\)/gi,

    // Quality indicators
    /\s*\(?\d{3,4}p\)?/gi,
    /\s*\(?HD\)?/gi,
    /\s*\(?HQ\)?/gi,
    /\s*\(?4K\)?/gi,

    // Year patterns at the end
    /\s*\(?\d{4}\)?$/g,

    // Hashtags
    /#\w+/g,

    // Emojis and special unicode (simplified)
    /[\uD83C-\uDBFF\uDC00-\uDFFF]+/g,

    // Multiple dots
    /\.{2,}/g,

    // Leading/trailing special chars
    /^[\s\-–—_:,.|]+/,
    /[\s\-–—_:,.|]+$/,
  ];

  for (const pattern of patternsToRemove) {
    title = title.replace(pattern, "");
  }

  // Clean up whitespace
  title = title.replace(/\s+/g, " ").trim();

  // If title becomes empty or too short, return original (cleaned of basic stuff)
  if (title.length < 2) {
    return rawTitle.replace(/[|❖✦★☆◆◇●○【】\[\]]/g, " ").replace(/\s+/g, " ").trim();
  }

  // Capitalize first letter of each word for Vietnamese
  title = title
    .split(" ")
    .map(word => {
      if (word.length === 0) return word;
      // Keep original case for Vietnamese words (they might already be correct)
      return word;
    })
    .join(" ");

  return title;
}

/**
 * Clean artist name from YouTube channel or video metadata
 */
export function cleanArtistName(rawArtist: string): string {
  if (!rawArtist) return "Unknown";

  let artist = rawArtist;

  // Remove common suffixes
  const patternsToRemove = [
    /\s*[-–—]\s*Topic$/i,
    /\s*Official$/i,
    /\s*Music$/i,
    /\s*Channel$/i,
    /\s*VEVO$/i,
    /\s*Records?$/i,
    /\s*Entertainment$/i,
    /\s*Productions?$/i,
    /\s*Studio$/i,
  ];

  for (const pattern of patternsToRemove) {
    artist = artist.replace(pattern, "");
  }

  return artist.trim() || "Unknown";
}
