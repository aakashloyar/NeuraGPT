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
export const HistorySchema=z.object({
    question:z.string(),
    answer:z.string()
})

export type ChatType = z.infer<typeof chatSchema>;
export type MessageType = z.infer<typeof messageSchema>;
export type History = z.infer<typeof HistorySchema>;
