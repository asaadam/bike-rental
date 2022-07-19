import {
  Grid,
  Heading,
  VStack,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useCacelBook } from '../modules/Bike/CancelBookinService';
import { BikeDetailVariant } from '../modules/Bike/ListBike';
import { RatingBike } from '../modules/Bike/RatingBike';
import { RentedBikeWithBike } from '../types/Auth';
import { ApiError } from '../types/Error';
import { formatDisplayDate } from '../utils/formatDate';

type Props = {
  rentedBike: RentedBikeWithBike;
  variant?: BikeDetailVariant;
  onSuccess: () => void;
};
function Rentedbike({ rentedBike, variant = 'default', onSuccess }: Props) {
  const { mutate, isLoading } = useCacelBook();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const submitCancel = () => {
    mutate(
      {
        rentedId: rentedBike.id,
      },
      {
        onSuccess: () => {
          onSuccess();
          onClose();
        },
        onError: (e) => {
          const error = e as ApiError;
          toast({
            title: error.response.data.message,
          });
        },
      }
    );
  };

  const renderDetail = () => {
    return (
      <>
        <VStack align={'flex-start'}>
          <Heading size="sm">Bike Detail</Heading>
          <Heading size="sm">Model : {rentedBike.bike.model}</Heading>
          <Heading size="sm">Location : {rentedBike.bike.location}</Heading>
          <Heading size="sm">Color : {rentedBike.bike.color}</Heading>
          <Heading size="sm">Bike Rating : {rentedBike.bike.rating}</Heading>
        </VStack>
        <Heading size="sm">
          Rented From : {formatDisplayDate(rentedBike.startDate)}
        </Heading>
        <Heading size="sm">
          Rented To : {formatDisplayDate(rentedBike.endDate)}
        </Heading>
      </>
    );
  };

  return (
    <>
      <Grid
        key={rentedBike.id}
        width={'100%'}
        templateColumns="repeat(5, 1fr)"
        gap={6}
      >
        <>
          {renderDetail()}
          {rentedBike?.BikeRating?.rating ? (
            <Heading size="sm">
              Rating:
              <br />
              {rentedBike.BikeRating.rating}{' '}
            </Heading>
          ) : variant === 'default' ? (
            <RatingBike
              bike={rentedBike.bike}
              rentedId={rentedBike.id}
              onSuccess={onSuccess}
            />
          ) : (
            <p>No Rating yet</p>
          )}
        </>
        {dayjs().isBefore(dayjs(rentedBike.endDate)) &&
          !rentedBike.isCanceled && (
            <Button onClick={onOpen}>Cancel Booking</Button>
          )}
        {rentedBike.isCanceled && (
          <Heading color="red" size="xs">
            Booking Canceled
          </Heading>
        )}
      </Grid>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure want to cancel this book ? </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <>{renderDetail()}</>
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={isLoading}
              colorScheme="red"
              mr={3}
              onClick={submitCancel}
            >
              Cancel Booking
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export { Rentedbike };
