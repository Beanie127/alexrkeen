import { defineCollection,z } from "astro:content";
import { file } from "astro/loaders";

const quotes = defineCollection({
    loader: file("src/content/quotes.json"),
    schema: z.object({
        id: z.string(),
        author: z.string(),
        source: z.string().optional(),
        url: z.string().optional(),
        category: z.string().optional()
    })
})

const blogs = defineCollection({
    loader: file("src/content/blogs.json"),
    schema: z.object({
        id: z.string(),
        items: z.array(z.object({
            id: z.string(),
            xmlUrl: z.string(),
            htmlUrl: z.string(),
            description: z.string().optional()
        }))
    })
})

export const collections = {quotes, blogs}