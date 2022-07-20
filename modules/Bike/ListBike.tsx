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
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { CreateBikeContainer } from './CreateBike';
import { AllBikeType } from '../../types/Bike';
import { useDeleteBike } from './DeleteBikeService';
import { ApiError } from '../../types/Error';
import { useRouter } from 'next/router';
import { useRefetchStore } from '../../store/DashBoardStore';

export type BikeDetailVariant = 'default' | 'manager';

type Props = {
  variant?: BikeDetailVariant;
};

type GetBikeDataFilter = {
  startDate: string;
  endDate: string;
  color: string;
  location: string;
  model: string;
  rating: string;
};

function ListBikeContainer({ variant = 'default' }: Props) {
  const router = useRouter();
  const query = router.query as unknown as GetBikeDataFilter;
  const { setRefetchFunction, triggerRefetch } = useRefetchStore();

  const [filterData, setFilterData] = useState({
    startDate: dayjs().toString(),
    endDate: dayjs().add(1, 'day').toString(),
    color: '',
    location: '',
    model: '',
    rating: '',
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, refetch, isLoading } = useGetBike(
    variant === 'default'
      ? {
          color: query.color || undefined,
          location: query.location || undefined,
          model: query.model || undefined,
          rating: query.rating || undefined,
          startDateQuery: dayjs(query.startDate).toISOString(),
          endDate: dayjs(query.endDate).toISOString(),
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
            triggerRefetch();
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

  useEffect(() => {
    if (!query.startDate && !query.endDate) {
      router.replace({
        pathname: router.pathname,
        query: {
          ...router.query,
          startDate: dayjs().format('YYYY-MM-DD'),
          endDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
        },
      });
    } else {
      setFilterData({
        startDate: dayjs(query.startDate).toString(),
        endDate: dayjs(query.endDate).toString(),
        color: query.color || '',
        location: query.location || '',
        model: query.model || '',
        rating: query.rating || '',
      });
    }
  }, [
    query.endDate,
    query.startDate,
    router,
    query.color,
    query.location,
    query.model,
    query.rating,
  ]);

  useEffect(() => {
    if (query.startDate && query.endDate) {
      refetch();
    }
  }, [query, refetch]);

  useEffect(() => {
    setRefetchFunction(refetch);
  }, [refetch, setRefetchFunction]);

  return (
    <>
      {variant === 'default' && (
        <form id="form-query">
          <VStack>
            <HStack>
              <VStack>
                <Heading size="sm">Start Date</Heading>
                <DatePicker
                  minDate={dayjs().toDate()}
                  selected={dayjs(filterData.startDate).toDate()}
                  onChange={(date: Date) => {
                    setFilterData({
                      ...filterData,
                      startDate: dayjs(date).format('YYYY-MM-DD'),
                    });
                  }}
                />
              </VStack>
              <VStack>
                <Heading size="sm">End Date</Heading>
                <DatePicker
                  minDate={dayjs(filterData.startDate).toDate()}
                  selected={dayjs(filterData.endDate).toDate()}
                  onChange={(date: Date) =>
                    setFilterData({
                      ...filterData,
                      endDate: dayjs(date).format('YYYY-MM-DD'),
                    })
                  }
                />
              </VStack>
              <VStack>
                <Heading size="sm">Color</Heading>
                <Input
                  value={filterData.color}
                  onChange={(value) =>
                    setFilterData({ ...filterData, color: value.target.value })
                  }
                />
              </VStack>
              <VStack>
                <Heading size="sm">Location</Heading>
                <Input
                  value={filterData.location}
                  onChange={(value) =>
                    setFilterData({
                      ...filterData,
                      location: value.target.value,
                    })
                  }
                />
              </VStack>
              <VStack>
                <Heading size="sm">Model</Heading>
                <Input
                  value={filterData.model}
                  onChange={(value) =>
                    setFilterData({ ...filterData, model: value.target.value })
                  }
                />
              </VStack>
              <VStack>
                <Heading size="sm">Rating</Heading>
                <Input
                  value={filterData.rating}
                  type="number"
                  min={0}
                  max={5}
                  onChange={(value) => {
                    setFilterData({
                      ...filterData,
                      rating: value.target.value,
                    });
                  }}
                />
              </VStack>
            </HStack>
            <Button
              type="submit"
              form="form-query"
              onClick={(e) => {
                e.preventDefault();
                //check if startDate is less than endDate
                if (
                  dayjs(filterData.startDate).isAfter(dayjs(filterData.endDate))
                ) {
                  return toast({
                    title: 'Start date must be before end date',
                    status: 'error',
                    isClosable: true,
                  });
                }
                router.push({
                  pathname: router.pathname,
                  query: {
                    ...query,
                    ...filterData,
                  },
                });
              }}
            >
              Search
            </Button>
          </VStack>
        </form>
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
              onSuccess={() => triggerRefetch()}
              filter={{
                startDate: dayjs(filterData.startDate).toDate(),
                endDate: dayjs(filterData.endDate).toDate(),
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
                  onClose();
                  triggerRefetch();
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
