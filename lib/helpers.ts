import readingTime from 'reading-time';

export function calculateReadingTime(content: string): string {
  const stats = readingTime(content);
  return stats.text;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

export function generateTableOfContents(content: string) {
  const headingRegex = /<h([2-3])[^>]*>(.*?)<\/h\1>/gi;
  const headings: Array<{ level: number; text: string; id: string }> = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = parseInt(match[1]);
    const text = match[2].replace(/<[^>]*>/g, '');
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    headings.push({ level, text, id });
  }

  return headings;
}
