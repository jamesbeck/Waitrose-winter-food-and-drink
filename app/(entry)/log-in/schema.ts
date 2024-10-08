import { errorMap } from '@/lib/errorMap';
import { z } from 'zod';

z.setErrorMap(errorMap);

export const formSchema = z.object({
  email: z.string().email().min(1),
});

export type FormSchema = z.infer<typeof formSchema>;
