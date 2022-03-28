import { z } from "zod";

export const createPostSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    description: z.string().optional(),
    published: z.boolean().optional(),
  }),
  user: z.object({
    id: z.string(),
  }),
});
