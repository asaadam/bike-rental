import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useUserStore } from '../../store/UserStore';
import { AllBikeType } from '../../types/Bike';
import { formatDisplayDate } from '../../utils/formatDate';
import { useBookBike } from './BookBikeService';

type Props = {
  bike: AllBikeType;
  filter: {
    startDate: Date;
    endDate: Date;
  };
  onSuccess?: () => void;
};

function BookBike({ bike, filter, onSuccess }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user } = useUserStore();

  const { mutate, isLoading } = useBookBike();

  const submitData = () => {
    mutate(
      {
        bikeId: bike.id,
        startDate: filter.startDate.toISOString(),
        endDate: filter.endDate.toISOString(),
      },
      {
        onSuccess: () => {
          if (onSuccess) {
            onSuccess();
          }
          onClose();
        },
      }
    );
  };

  if (user) {
    return (
      <div>
        <Button onClick={onOpen}>Book Bike</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Heading size="sm">
                Are you sure want to booking this bike ?{' '}
              </Heading>
              <Heading size="xs">Model : {bike.model}</Heading>
              <Heading size="xs">Location : {bike.location}</Heading>
              <Heading size="xs">Color : {bike.color}</Heading>
              <Heading size="xs"> Rating : {bike.rating} </Heading>
              <Heading size="xs">
                Start Date : {formatDisplayDate(filter.startDate)}
              </Heading>
              <Heading size="xs">
                End Date : {formatDisplayDate(filter.endDate)}
              </Heading>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button
                isLoading={isLoading}
                colorScheme="blue"
                mr={3}
                onClick={submitData}
              >
                Book Now
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    );
  }
  return null;
}

export { BookBike };
