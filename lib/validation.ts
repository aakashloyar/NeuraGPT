import { z } from "zod";
export const chatSchema=z.object({
    id: z.string(),
    title: z.string(),
    createdAt: z.date(),
})

export type ChatType = z.infer<typeof chatSchema>;
