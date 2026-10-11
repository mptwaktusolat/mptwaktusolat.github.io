import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { isDate, parsePostFilename } from "./lib/blog";

const blog = defineCollection({
  loader: glob({
    base: "./src/content/blog",
    pattern: "**/*.md",
    generateId: ({ entry }) => {
      parsePostFilename(entry);
      return entry.replace(/\.md$/, "");
    },
  }),
  schema: z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    tags: z.array(z.string().trim().min(1)),
    updatedDate: z
      .string()
      .refine(isDate, "Use a valid YYYY-MM-DD date")
      .optional(),
  }),
});

export const collections = { blog };
