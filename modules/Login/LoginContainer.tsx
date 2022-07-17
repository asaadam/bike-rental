import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
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
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const { mutate } = useLogin();

  const toast = useToast();

  const onSubmit: SubmitHandler<FormValues> = (data) =>
    mutate(data, {
      onSuccess: (data) => {
        console.log(data);
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
            <FormLabel htmlFor="password">Email</FormLabel>
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
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </VStack>
      </form>
    </VStack>
  );
}

export { LoginContainer };
