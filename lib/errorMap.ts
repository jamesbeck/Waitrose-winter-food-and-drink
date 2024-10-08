import type { ZodErrorMap } from 'zod';

export const errorMap: ZodErrorMap = (issue, ctx) => {
  switch (issue.code) {
    case 'invalid_type':
      if (issue.expected === 'string') {
        return { message: 'This field is required' };
      }
      break;
    case 'too_small':
      if (issue.minimum === 1) {
        return { message: 'This field is required' };
      }
      break;
    case 'invalid_string':
      if (issue.validation === 'email') {
        return { message: 'Please enter a valid email address' };
      }
      break;
    default:
      return { message: ctx.defaultError };
  }

  return { message: ctx.defaultError };
};
