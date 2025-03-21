import { defineCollection, z } from "astro:content";
import { file } from "astro/loaders";

const blogroll = defineCollection({
    loader: file("src/blogroll.json"),
    schema: z.object({
        id: z.string(),
        outline: z.array(z.object({
            id: z.string(),
            _description: z.string().default(""),
            _xmlUrl: z.string(),
            _htmlUrl: z.string()
        }))
    })
})

export const collections = {blogroll};