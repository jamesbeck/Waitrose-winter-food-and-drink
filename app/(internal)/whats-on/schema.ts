import { errorMap } from '@/lib/errorMap';
import { z } from 'zod';

z.setErrorMap(errorMap);

export const formSchema = z.object({
  days: z
    .array(z.enum(['Friday', 'Saturday', 'Sunday']))
    .min(1, 'Please select at least one date'),
});

export type FormSchema = z.infer<typeof formSchema>;
