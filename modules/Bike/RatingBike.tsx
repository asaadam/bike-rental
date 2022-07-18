import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Heading,
  ModalFooter,
  Button,
  useDisclosure,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import { Bike } from '@prisma/client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ApiError } from '../../types/Error';
import { useRatingBike } from './RatingService';

type Props = {
  bike: Bike;
  rentedId: string;
  onSuccess: () => void;
};

type FormValues = {
  rating: number;
};

function RatingBike({ bike, rentedId, onSuccess }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isLoading } = useRatingBike();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>();
  const toast = useToast();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutate(
      {
        rentedId,
        rating: data.rating,
      },
      {
        onSuccess: () => {
          if (onSuccess) {
            onSuccess();
          }
          onClose();
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
  };

  return (
    <>
      <Button onClick={onOpen}>Give Rating</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading size="sm">Give Rating For this bike </Heading>
            <Heading size="xs">Model : {bike.model}</Heading>
            <Heading size="xs">Location : {bike.location}</Heading>
            <Heading size="xs">Color : {bike.color}</Heading>
            <Heading size="xs"> Rating : {bike.rating} </Heading>
            <form id="rating-form" onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={!!errors.rating}>
                <FormLabel htmlFor="email">Color</FormLabel>
                <Input
                  id="rating"
                  type={'number'}
                  placeholder="Input Rating"
                  {...register('rating', {
                    required: 'This is required',
                    max: 5,
                    valueAsNumber: true,
                    validate: (value) => {
                      if (value > 5) {
                        return 'Rating must be less than 5';
                      }
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.rating && 'Value must between 0 and 5'}
                </FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={isLoading}
              colorScheme="blue"
              mr={3}
              type="submit"
              form="rating-form"
            >
              Give Rating Now
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export { RatingBike };
