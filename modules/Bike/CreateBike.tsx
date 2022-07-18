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
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ApiError } from '../../types/Error';
import { useCreateBike } from './CreateBikeService';
import { useEditBike } from './EditBikeService';

type FormValues = {
  id?: string;
  model: string;
  color: string;
  location: string;
};

type Props = {
  onSuccess?: () => void;
  defaultValues?: FormValues;
};

function CreateBikeContainer({ onSuccess, defaultValues }: Props) {
  const {
    handleSubmit,
    register,
    formState: { errors },

    reset,
  } = useForm<FormValues>();

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const { mutate, isLoading } = useCreateBike();

  const { mutate: mutateEdit, isLoading: isLoadingEdit } = useEditBike();

  const toast = useToast();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (defaultValues) {
      mutateEdit(
        {
          ...data,
          id: defaultValues.id,
        },
        {
          onSuccess: () => {
            if (onSuccess) {
              onSuccess();
            }
          },
          onError: (e) => {
            const error = e as ApiError;
            toast({
              title: error.response.data.message,
              status: 'error',
              isClosable: true,
            });
          },
        }
      );
      return;
    }
    mutate(data, {
      onSuccess: () => {
        toast({
          title: 'Succes',
          description: 'User created successfully',
          status: 'success',
        });
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
          <FormControl isInvalid={!!errors.model?.message}>
            <FormLabel htmlFor="email">Model</FormLabel>
            <Input
              id="model"
              placeholder="Model"
              {...register('model', {
                required: 'This is required',
              })}
            />
            <FormErrorMessage>
              {errors.model && errors.model.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.color?.message}>
            <FormLabel htmlFor="email">Color</FormLabel>
            <Input
              id="color"
              placeholder="Color"
              {...register('color', {
                required: 'This is required',
              })}
            />
            <FormErrorMessage>
              {errors.color && errors.color.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.location?.message}>
            <FormLabel htmlFor="email">Location</FormLabel>
            <Input
              id="location"
              placeholder="Location"
              {...register('location', {
                required: 'This is required',
              })}
            />
            <FormErrorMessage>
              {errors.location && errors.location.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isLoading || isLoadingEdit}
            type="submit"
          >
            Submit
          </Button>
        </VStack>
      </form>
    </VStack>
  );
}

export { CreateBikeContainer };
