import { FC, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ButtonForm from '~/components/Form/ButtonForm';
import Divider from '~/components/Form/Divider';
import InputForm from '~/components/Form/InputForm';
import FormLayout from '~/layouts/FormLayout';
import { pathRoute } from '~/utils/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema, loginSchema } from '~/utils/rules';
import { useForm } from 'react-hook-form';
import ButtonFacebook from '~/components/Form/ButtonFacebook';
import ButtonGoogle from '~/components/Form/ButtonGoogle';
import { IFormError } from '~/types/global';
import { AppContext } from '~/contexts/AppContext';
import { useMutation } from '@tanstack/react-query';
import authApi from '~/services/auth';
import { isAxiosError } from '~/utils/error';
import { toast } from 'react-toastify';
import InputFormPassword from '~/components/Form/InputFormPassword';

type FormData = LoginSchema;

const initialFormState: FormData = {
  email: '',
  password: '',
};

const Login: FC = () => {
  const { isAuthenticated, setIsAuthenticated, setCurrentUser } = useContext(AppContext);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: initialFormState,
    resolver: yupResolver(loginSchema),
  });

  const loginUserMutation = useMutation({
    mutationFn: (body: FormData) => authApi.loginUser(body),
  });

  const handleLogin = (values: FormData) => {
    if (!isAuthenticated) {
      loginUserMutation.mutate(values, {
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
      <form className='flex flex-col items-center' onSubmit={handleSubmit(handleLogin)}>
        <div className='flex flex-col w-full gap-2 mt-5'>
          <InputForm
            name='email'
            placeholder='Phone number, username or email'
            register={register}
            type='text'
            errorMessage={errors.email?.message}
          ></InputForm>
          <InputFormPassword
            name='password'
            placeholder='Password'
            register={register}
            type='password'
            errorMessage={errors.password?.message}
          ></InputFormPassword>
          <Link to={pathRoute.forgotten_password} className='mb-4 text-right'>
            <button className='text-xs font-medium cursor-pointer select-none'>
              Forgotten password?
            </button>
          </Link>
        </div>
        <ButtonForm
          type='submit'
          isLoading={loginUserMutation.isLoading}
          disabled={loginUserMutation.isLoading}
        >
          {'Log in'}
        </ButtonForm>
        <Divider></Divider>
        <div className='w-full mt-1'>
          <ButtonFacebook></ButtonFacebook>
          <ButtonGoogle></ButtonGoogle>
        </div>
        <div className='absolute bottom-0 w-full py-3 text-sm text-center transition-all border-t sm:pt-5 sm:pb-2 sm:relative sm:border-transparent border-grayPrimary'>
          Do not have an account?{' '}
          <Link to='/register' className='font-semibold cursor-pointer'>
            Sign Up
          </Link>
        </div>
      </form>
    </FormLayout>
  );
};

export default Login;
