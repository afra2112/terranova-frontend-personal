import { z } from "zod";

/**
 * Zod validation schemas for auth forms. Forms (React Hook Form +
 * zodResolver) and the inferred TS types both derive from these, so client
 * validation and form typing never drift. Messages are in Spanish to match the
 * UX spec's audience.
 */

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El correo es obligatorio")
    .email("Ingresa un correo válido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(1, "El nombre es obligatorio")
    .min(3, "Ingresa tu nombre completo"),
  email: z
    .string()
    .min(1, "El correo es obligatorio")
    .email("Ingresa un correo válido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
  wantsToSell: z.boolean().optional(),
});

export const verifyEmailSchema = z.object({
  email: z.string().email("Ingresa un correo válido"),
  code: z
    .string()
    .min(4, "El código no es válido")
    .max(8, "El código no es válido"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>;
