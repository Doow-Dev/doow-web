export function helpPathForCategory(category: string) {
  return `/help/${category}`;
}

export function helpPathForArticle(category: string, slug: string) {
  return `/help/${category}/${slug}`;
}
