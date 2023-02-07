import { FC, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import ButtonForm from '~/components/Form/ButtonForm';
import Divider from '~/components/Form/Divider';
import FormLayout from '~/layouts/FormLayout';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterSchema, registerSchema } from '~/utils/rules';
import InputForm from '~/components/Form/InputForm';
import ButtonFacebook from '~/components/Form/ButtonFacebook';
import ButtonGoogle from '~/components/Form/ButtonGoogle';
import { useMutation } from '@tanstack/react-query';
import authApi from '~/services/auth';
import { AppContext } from '~/contexts/AppContext';
import { IFormError } from '~/types/global';
import { isAxiosError } from '~/utils/error';
import { toast } from 'react-toastify';
import { pathRoute } from '~/utils/constants';
import InputFormPassword from '~/components/Form/InputFormPassword';

type FormData = RegisterSchema;

const initialFormState: FormData = {
  email: '',
  password: '',
  fullname: '',
  username: '',
};

const Register: FC = () => {
  const { isAuthenticated, setIsAuthenticated, setCurrentUser } = useContext(AppContext);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: initialFormState,
    resolver: yupResolver(registerSchema),
  });

  const registerUserMutation = useMutation({
    mutationFn: (body: FormData) => authApi.registerUser(body),
  });

  const handleSignUp = (values: FormData) => {
    if (!isAuthenticated) {
      registerUserMutation.mutate(values, {
        onSuccess: (data) => {
          setIsAuthenticated(true);
          setCurrentUser(data.data.data.user);
          navigate(pathRoute.home);
        },
        onError: (error) => {
          if (isAxiosError<IFormError>(error)) {
            toast.error(error.response?.data.msg);
          }
        },
      });
    }
  };

  useEffect(() => {
    if (errors) {
      toast.error(Object.values(errors)[0]?.message);
    }
  }, [errors]);

  return (
    <FormLayout>
      <form className='flex flex-col items-center' onSubmit={handleSubmit(handleSignUp)}>
        <div className='mb-1 font-semibold text-center'>
          Sign up to see photos and videos from friends.
        </div>
        <div className='w-full mt-1'>
          <ButtonFacebook></ButtonFacebook>
          <ButtonGoogle></ButtonGoogle>
        </div>
        <Divider></Divider>
        <div className='flex flex-col w-full gap-2 mt-3 mb-3'>
          <InputForm
            name='email'
            placeholder='Mobile Number or Email'
            register={register}
            type='text'
            errorMessage={errors.email?.message}
          ></InputForm>
          <InputForm
            name='fullname'
            placeholder='Full Name'
            register={register}
            type='text'
            errorMessage={errors.fullname?.message}
          ></InputForm>
          <InputForm
            name='username'
            placeholder='Username'
            register={register}
            type='text'
            errorMessage={errors.username?.message}
          ></InputForm>
          <InputFormPassword
            name='password'
            placeholder='Password'
            register={register}
            type='password'
            errorMessage={errors.password?.message}
          ></InputFormPassword>
        </div>
        <ButtonForm
          type='submit'
          isLoading={registerUserMutation.isLoading}
          disabled={registerUserMutation.isLoading}
        >
          {'Sign Up'}
        </ButtonForm>
        <div className='fixed bottom-0 w-full py-3 text-sm text-center transition-all border-t sm:pt-5 sm:pb-2 sm:relative sm:border-transparent border-grayPrimary'>
          Do not have an account?{' '}
          <Link to='/login' className='font-semibold cursor-pointer'>
            Sign In
          </Link>
        </div>
      </form>
    </FormLayout>
  );
};

export default Register;
