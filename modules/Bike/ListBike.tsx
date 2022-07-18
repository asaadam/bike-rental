import {
  Accordion,
  Checkbox,
  Heading,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';
import { BikeDetail } from '../../uikit/BikeDetail';
import { useGetBike } from './ListBikeService';
import DatePicker from 'react-datepicker';
import { useState } from 'react';
import dayjs from 'dayjs';

export type BikeDetailVariant = 'default' | 'admin';

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

  const { data } = useGetBike(
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

      <Accordion allowMultiple width={'100%'}>
        {data?.bikeData?.map?.((bike) => (
          <BikeDetail bike={bike} key={bike.id} variant={variant} />
        ))}
      </Accordion>
    </>
  );
}

export { ListBikeContainer };
