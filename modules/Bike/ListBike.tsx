import {
  Accordion,
  Button,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { BikeDetail } from '../../uikit/BikeDetail';
import { useGetBike } from './ListBikeService';
import DatePicker from 'react-datepicker';
import { useState } from 'react';
import dayjs from 'dayjs';
import { CreateBikeContainer } from './CreateBike';
import { AllBikeType } from '../../types/Bike';
import Head from 'next/head';
import { useDeleteBike } from './DeleteBikeService';
import { ApiError } from '../../types/Error';

export type BikeDetailVariant = 'default' | 'manager';

type Props = {
  variant?: BikeDetailVariant;
};

function ListBikeContainer({ variant = 'default' }: Props) {
  const [filterData, setFilterData] = useState({
    startDate: dayjs().toDate(),
    endDate: dayjs().add(1, 'day').toDate(),
    color: '',
    location: '',
    model: '',
    rating: '',
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, refetch, isLoading } = useGetBike(
    variant === 'default'
      ? {
          startDateQuery: filterData.startDate.toISOString(),
          endDate: filterData.endDate.toISOString(),
          color: filterData.color || undefined,
          location: filterData.location || undefined,
          model: filterData.model || undefined,
          rating: filterData.rating || undefined,
        }
      : {}
  );

  const { mutate, isLoading: isLoadingMutate } = useDeleteBike();

  const [selectedData, setSelectedData] = useState<
    AllBikeType & {
      isDelete?: boolean;
    }
  >();

  const toast = useToast();

  const customClose = () => {
    setSelectedData(undefined);
    onClose();
  };

  const onDelete = () => {
    if (selectedData) {
      mutate(
        { bikeId: selectedData?.id },
        {
          onSuccess: () => {
            refetch();
            customClose();
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
    }
  };

  return (
    <>
      {variant === 'default' && (
        <HStack>
          <VStack>
            <Heading size="sm">Start Date</Heading>
            <DatePicker
              minDate={dayjs().toDate()}
              selected={filterData.startDate}
              onChange={(date: Date) => {
                setFilterData({ ...filterData, startDate: date });
              }}
            />
          </VStack>
          <VStack>
            <Heading size="sm">End Date</Heading>
            <DatePicker
              minDate={dayjs(filterData.startDate).toDate()}
              selected={filterData.endDate}
              onChange={(date: Date) =>
                setFilterData({ ...filterData, endDate: date })
              }
            />
          </VStack>
          <VStack>
            <Heading size="sm">Color</Heading>
            <Input
              onChange={(value) =>
                setFilterData({ ...filterData, color: value.target.value })
              }
            />
          </VStack>
          <VStack>
            <Heading size="sm">Location</Heading>
            <Input
              onChange={(value) =>
                setFilterData({ ...filterData, location: value.target.value })
              }
            />
          </VStack>
          <VStack>
            <Heading size="sm">Rating</Heading>
            <Input
              onChange={(value) =>
                setFilterData({ ...filterData, rating: value.target.value })
              }
            />
          </VStack>
          <VStack>
            <Heading size="sm">Model</Heading>
            <Input
              onChange={(value) =>
                setFilterData({ ...filterData, model: value.target.value })
              }
            />
          </VStack>
        </HStack>
      )}
      {variant === 'manager' && (
        <Button onClick={onOpen} mb={4}>
          Create bike
        </Button>
      )}

      {isLoading ? (
        <Spinner />
      ) : data?.bikeData.length ? (
        <Accordion allowMultiple width={'100%'} mt={4}>
          {data?.bikeData?.map?.((bike) => (
            <BikeDetail
              onSuccess={() => refetch()}
              filter={{
                startDate: filterData.startDate,
                endDate: filterData.endDate,
              }}
              bike={bike}
              key={bike.id}
              variant={variant}
              onEdit={() => {
                onOpen();
                setSelectedData(bike);
              }}
              onDelete={() => {
                onOpen();
                setSelectedData({ ...bike, isDelete: true });
              }}
            />
          ))}
        </Accordion>
      ) : (
        <Heading>No Data</Heading>
      )}

      <Modal isOpen={isOpen} onClose={customClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedData?.isDelete ? 'Delete Bike' : 'Edit Bike'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedData?.isDelete ? (
              <VStack>
                <Heading size="sm">
                  Are you sure to delete this following data ? :{' '}
                </Heading>
                <Heading size="xs">Model : {selectedData?.model}</Heading>
                <Heading size="xs">Color : {selectedData.color}</Heading>
                <Heading size="xs">Location : {selectedData.location}</Heading>
                <HStack>
                  <Button
                    isLoading={isLoadingMutate}
                    onClick={onDelete}
                    colorScheme="red"
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={onClose}
                    isLoading={isLoadingMutate}
                    variant="ghost"
                  >
                    Cancel
                  </Button>
                </HStack>
              </VStack>
            ) : (
              <CreateBikeContainer
                defaultValues={
                  selectedData && {
                    id: selectedData.id,
                    color: selectedData.color,
                    location: selectedData.location,
                    model: selectedData.model,
                  }
                }
                onSuccess={() => {
                  refetch();
                  onClose();
                }}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export { ListBikeContainer };
