import {z} from 'zod'

export const editTaskSchema = z.object({
    todo: z.string().min(1, "Text is required").max(200, "Too long"),
    userId: z.number().int().positive(),
})

export type EditTaskFormValues = z.infer<typeof editTaskSchema>