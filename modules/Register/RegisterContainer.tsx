import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ApiError } from '../../types/Error';
import { useUpdateUser } from '../Profile/EditUserService';
import { useRegister } from './RegisterService';

type FormValues = {
  email: string;
  name: string;
  password: string;
  rePassword: string;
  role?: string;
  id?: string;
};

type RegisterVariant = 'admin' | 'user';

type Props = {
  onSuccess?: () => void;
  variant?: RegisterVariant;
  defaultValues?: FormValues;
};

function RegisterContainer({
  variant = 'user',
  onSuccess,
  defaultValues,
}: Props) {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const router = useRouter();

  const { mutate, isLoading } = useRegister();

  const { mutate: mutateEdit, isLoading: loadingEdit } = useUpdateUser();

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const toast = useToast();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { rePassword, ...restData } = data;
    if (defaultValues) {
      mutateEdit(
        {
          ...restData,
          password: data.password || undefined,
          id: defaultValues.id,
          role: data.role,
        },
        {
          onSuccess: () => {
            if (onSuccess) {
              onSuccess();
            }
          },
        }
      );
      return;
    }
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
        if (onSuccess) {
          onSuccess();
        }
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
          {variant === 'admin' && (
            <>
              <FormControl>
                <FormLabel htmlFor="email">Role</FormLabel>
                <Select
                  defaultValue={'user'}
                  {...register('role', {
                    required: 'This is required',
                  })}
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </Select>
              </FormControl>
              <FormErrorMessage>
                {errors.role && errors.role.message}
              </FormErrorMessage>
            </>
          )}

          {(variant === 'user' || (variant === 'admin' && !defaultValues)) && (
            <>
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
                      return (
                        value === watch('password') || 'Password is not same'
                      );
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.rePassword && errors.rePassword.message}
                </FormErrorMessage>
              </FormControl>
            </>
          )}

          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isLoading || loadingEdit}
            type="submit"
          >
            Submit
          </Button>
        </VStack>
      </form>
    </VStack>
  );
}

export { RegisterContainer };
