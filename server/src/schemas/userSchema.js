import { z } from 'zod';

export const updateProfileSchema = z
  .object({
    bio: z
      .string()
      .max(160, { message: 'La biografía no puede exceder 160 caracteres' })
      .optional(),

    gymGoals: z
      .string()
      .max(50, { message: 'El objetivo debe ser breve' })
      .optional(),

    avatarUrl: z
      .url({ message: 'La foto debe ser una URL válida (http...)' })
      .optional(),
  })
  .strict();
