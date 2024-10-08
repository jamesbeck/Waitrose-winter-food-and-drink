import { errorMap } from '@/lib/errorMap';
import { z } from 'zod';

z.setErrorMap(errorMap);

export const formSchema = z.object({
  email: z.string().email().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  loyaltyCardNumber: z.string(),
});

export type FormSchema = z.infer<typeof formSchema>;
