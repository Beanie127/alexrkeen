import { Loader } from "astro/loaders";
import {z} from "astro/zod";
import { get } from "node:http";

export function blogLoader(options: {url: string, apiKey: string}) {
    const url = new URL(options.url)
    return {
        name: "blog-loader", load: async ({store, parseData}) => { 
            const feed = get("https://self.alexrkeen.com/rss/api/greader.php/reader/api/0/subscription/list?output=json") 
        }, schema: z.object({})
    }  satisfies Loader;
} 