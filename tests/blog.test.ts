import assert from "node:assert/strict";
import test from "node:test";
import { formatDate, groupTags, parsePostFilename, preparePosts } from "../src/lib/blog.ts";

const entry = (id: string, tags = ["design"], updatedDate?: string) => ({
  id, data: { title: "Example", description: "An example post", tags, updatedDate },
});

test("dated filenames produce clean slugs and calendar dates", () => {
  assert.deepEqual(parsePostFilename("2026-07-19-new-homepage-api-waktusolat.md"), {
    postedDate: "2026-07-19", slug: "new-homepage-api-waktusolat",
  });
  assert.equal(formatDate("2026-07-19"), "19 July 2026");
  assert.equal(parsePostFilename("2024-02-29-leap-day.md").postedDate, "2024-02-29");
});

test("invalid dates, malformed names and reserved routes are rejected", () => {
  for (const filename of ["2026-02-29-post.md", "2026-13-01-post.md", "2026-04-31-post.md",
    "post.md", "2026-7-19-post.md", "2026-07-19-Post.md", "2026-07-19-tags.md", "nested/2026-07-19-post.md"]) {
    assert.throws(() => parsePostFilename(filename));
  }
});

test("duplicate URLs are rejected even across different dates", () => {
  assert.throws(() => preparePosts([entry("2026-07-19-same"), entry("2026-10-11-same")]), /Duplicate blog slug/);
});

test("updated date is optional and must not precede publication", () => {
  assert.equal(preparePosts([entry("2026-07-19-post")])[0].entry.data.updatedDate, undefined);
  assert.equal(preparePosts([entry("2026-07-19-post", [], "2026-10-11")])[0].entry.data.updatedDate, "2026-10-11");
  assert.doesNotThrow(() => preparePosts([entry("2026-07-19-post", [], "2026-07-19")]));
  assert.throws(() => preparePosts([entry("2026-07-19-post", [], "2026-07-18")]), /updatedDate/);
  assert.throws(() => preparePosts([entry("2026-07-19-post", [], "2026-02-30")]), /updatedDate/);
});

test("tags preserve labels, deduplicate, group and sort posts newest first", () => {
  const posts = preparePosts([
    entry("2026-07-19-old", ["waktu solat project", "design", " design "]),
    entry("2026-10-11-new", ["design"]),
  ]);
  assert.deepEqual(posts.map((post) => post.slug), ["new", "old"]);
  const tags = groupTags(posts);
  assert.deepEqual(tags.map((tag) => tag.label), ["design", "waktu solat project"]);
  assert.deepEqual(tags[0].posts.map((post) => post.slug), ["new", "old"]);
  assert.equal(tags[1].slug, "waktu-solat-project");
  assert.equal(posts[1].tags.length, 2);
  assert.deepEqual(groupTags([]), []);
});

test("ambiguous and empty tag URL slugs are rejected", () => {
  assert.throws(() => preparePosts([entry("2026-07-19-post", ["UI design", "ui-design"])]), /share URL slug/);
  assert.throws(() => preparePosts([entry("2026-07-19-post", ["✨"])]), /non-empty/);
});
