/** The item after `slug`, wrapping around to the first one. */
export function nextOf<T extends { slug: string }>(items: readonly T[], slug: string): T | undefined {
  const index = items.findIndex((item) => item.slug === slug);
  return items[(index + 1) % items.length];
}
