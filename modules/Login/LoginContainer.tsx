import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import Cookies from 'universal-cookie';
import { useUserStore } from '../../store/UserStore';
import { ApiError } from '../../types/Error';
import { useLogin } from './LoginService';

type FormValues = {
  email: string;
  password: string;
};

function LoginContainer() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>();

  const router = useRouter();

  const { setUser } = useUserStore();
  const cookies = new Cookies();

  const { mutate, isLoading } = useLogin();

  const toast = useToast();

  const onSubmit: SubmitHandler<FormValues> = (data) =>
    mutate(data, {
      onSuccess: (data) => {
        setUser(data.user);
        cookies.set('isLoggedIn', true);
        cookies.set('role', data.user.role);
        router.push('/');
      },
      onError: (e) => {
        const error = e as ApiError;
        toast({
          title: 'Error',
          description: error.response.data.message,
          status: 'error',
        });
      },
    });

  return (
    <VStack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack>
          <FormControl isInvalid={!!errors.email?.message}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              placeholder="Email"
              {...register('email', {
                required: 'This is required',
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password?.message}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              {...register('password', {
                required: 'This is required',
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button mt={4} colorScheme="teal" isLoading={isLoading} type="submit">
            Submit
          </Button>
        </VStack>
      </form>
    </VStack>
  );
}

export { LoginContainer };
