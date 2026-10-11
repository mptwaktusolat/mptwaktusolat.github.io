export const BLOG_AUTHOR = "Muhammad Fareez";

export function isDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return (
    !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
  );
}

export function parsePostFilename(filename: string) {
  const match = /^(\d{4}-\d{2}-\d{2})-([a-z0-9]+(?:-[a-z0-9]+)*)\.md$/.exec(
    filename,
  );
  if (!match || !isDate(match[1])) {
    throw new Error(
      `Invalid blog filename "${filename}". Use YYYY-MM-DD-post-slug.md with a valid date.`,
    );
  }
  if (match[2] === "tags")
    throw new Error('The blog slug "tags" is reserved for the tag directory.');
  return { postedDate: match[1], slug: match[2] };
}

export function tagSlug(label: string): string {
  const slug = label
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  if (!slug)
    throw new Error(`Tag "${label}" must produce a non-empty URL slug.`);
  return slug;
}

interface Entry {
  id: string;
  data: {
    title: string;
    description: string;
    tags: string[];
    updatedDate?: string;
  };
}

export function preparePosts<T extends Entry>(entries: T[]) {
  const slugs = new Set<string>();
  const labels = new Map<string, string>();
  return entries
    .map((entry) => {
      const metadata = parsePostFilename(`${entry.id}.md`);
      if (slugs.has(metadata.slug))
        throw new Error(`Duplicate blog slug "${metadata.slug}".`);
      slugs.add(metadata.slug);
      const updated = entry.data.updatedDate;
      if (updated && (!isDate(updated) || updated < metadata.postedDate)) {
        throw new Error(
          `Invalid updatedDate for "${entry.id}": use a valid date on or after publication.`,
        );
      }
      const tags = [
        ...new Set(entry.data.tags.map((label) => label.trim())),
      ].map((label) => {
        const slug = tagSlug(label);
        const previous = labels.get(slug);
        if (previous !== undefined && previous !== label) {
          throw new Error(
            `Tags "${previous}" and "${label}" share URL slug "${slug}".`,
          );
        }
        labels.set(slug, label);
        return { label, slug };
      });
      return { entry, ...metadata, tags };
    })
    .sort(
      (a, b) =>
        b.postedDate.localeCompare(a.postedDate) ||
        a.slug.localeCompare(b.slug),
    );
}

export type BlogPost = ReturnType<typeof preparePosts>[number];

export function groupTags(posts: BlogPost[]) {
  const tags = new Map<
    string,
    { label: string; slug: string; posts: BlogPost[] }
  >();
  for (const post of posts) {
    for (const tag of post.tags) {
      if (!tags.has(tag.slug)) tags.set(tag.slug, { ...tag, posts: [] });
      tags.get(tag.slug)!.posts.push(post);
    }
  }
  return [...tags.values()].sort((a, b) =>
    a.label.localeCompare(b.label, "en"),
  );
}

export function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}
