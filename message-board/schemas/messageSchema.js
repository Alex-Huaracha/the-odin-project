import z from 'zod';

const messageSchema = z.object({
  text: z.string().min(1).max(500),
  user: z.string().min(1).max(50),
});

export const validateMessage = (input) => {
  return messageSchema.safeParse(input);
};
