const BLOG_DATE_FORMATTER = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
});

export function formatBlogDate(date: string) {
  return BLOG_DATE_FORMATTER.format(new Date(date));
}

export function formatBlogNumericDate(date: string) {
  const [year, month, day] = date.split("-");

  if (!year || !month || !day) {
    return formatBlogDate(date);
  }

  return `${month}-${day}-${year}`;
}

export function getAuthorLabel(authors: { name: string }[]) {
  return authors.map((author) => author.name).join(", ");
}

export function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
