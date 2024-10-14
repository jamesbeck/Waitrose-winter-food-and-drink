import { errorMap } from '@/lib/errorMap';
import { z } from 'zod';

z.setErrorMap(errorMap);

export const formSchema = z.object({
  search: z.string(),
});

export type FormSchema = z.infer<typeof formSchema>;
