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
import { ApiError } from '../../types/Error';
import { useRegister } from './RegisterService';

type FormValues = {
  email: string;
  name: string;
  password: string;
  rePassword: string;
};

type RegisterVariant = 'admin' | 'user';

type Props = {
  variant?: RegisterVariant;
};

function RegisterContainer({ variant = 'user' }: Props) {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const router = useRouter();

  const { mutate, isLoading } = useRegister();

  const toast = useToast();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { rePassword, ...restData } = data;
    mutate(restData, {
      onSuccess: () => {
        toast({
          title: 'Succes',
          description: 'User created successfully',
          status: 'success',
        });
        if (variant === 'user') {
          router.push('/login');
        }
        reset();
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
  };

  return (
    <VStack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack>
          <FormControl isInvalid={!!errors.name?.message}>
            <FormLabel htmlFor="email">Name</FormLabel>
            <Input
              id="name"
              placeholder="Name"
              {...register('name', {
                required: 'This is required',
              })}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
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
          <FormControl isInvalid={!!errors.rePassword?.message}>
            <FormLabel htmlFor="rePassword">Input Password again</FormLabel>
            <Input
              type="password"
              id="rePassword"
              placeholder="Input Password again"
              {...register('rePassword', {
                required: 'This is required',
                validate: (value) => {
                  return value === watch('password') || 'Password is not same';
                },
              })}
            />
            <FormErrorMessage>
              {errors.rePassword && errors.rePassword.message}
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

export { RegisterContainer };
