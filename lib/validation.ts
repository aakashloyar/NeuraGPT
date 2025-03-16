import { z } from "zod";
export const chatSchema=z.object({
    id: z.string(),
    title: z.string(),
    createdAt: z.date(),
})
export const messageSchema=z.object({
    id: z.string(),
    question: z.string(),
    answer:z.string(),
    createdAt: z.date(),
})

export type ChatType = z.infer<typeof chatSchema>;
export type MessageType = z.infer<typeof messageSchema>;
