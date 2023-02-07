import * as yup from 'yup';

export const registerSchema = yup.object({
  email: yup.string().required('Email is required').email('Email must be a valid email'),
  password: yup.string().required('Password is required'),
  fullname: yup.string().required('Fullname is required'),
  username: yup.string().required('Username is required'),
});

export const loginSchema = registerSchema.pick(['email', 'password']);

export type LoginSchema = yup.InferType<typeof loginSchema>;

export type RegisterSchema = yup.InferType<typeof registerSchema>;

// const schema = yup.object({
//   email: registerSchema.fields['email'],
//   date: yup.date().max(new Date(), ''),
// });
