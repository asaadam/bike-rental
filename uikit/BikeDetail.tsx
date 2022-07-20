import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  filter,
  Grid,
  Heading,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { BookBike } from '../modules/Bike/BookBike';
import { BikeDetailVariant } from '../modules/Bike/ListBike';
import { AllBikeType } from '../types/Bike';
import { formatDisplayDate } from '../utils/formatDate';

type Props = {
  bike: AllBikeType;
  variant?: BikeDetailVariant;
  onEdit?: () => void;
  filter?: {
    startDate: Date;
    endDate: Date;
  };
  onDelete?: () => void;
  onSuccess?: () => void;
};

function BikeDetail({
  bike,
  variant = 'default',
  onEdit,
  filter,
  onSuccess,
  onDelete,
}: Props) {
  return (
    <AccordionItem>
      <HStack w="100%">
        <AccordionButton>
          <Grid
            width={'100%'}
            templateColumns={
              variant === 'default' ? 'repeat(5, 1fr)' : 'repeat(5, 1fr)'
            }
            gap={6}
          >
            <Heading size="sm">Model : {bike.model}</Heading>
            <Heading size="sm">Location : {bike.location}</Heading>
            <Heading size="sm">Color : {bike.color}</Heading>
            <Heading size="sm"> Rating : {bike.rating} </Heading>
            {variant === 'default' && (
              <>
                <Heading size="sm">
                  Available for book{' '}
                  <Checkbox isChecked={bike.rentedData.length === 0} />
                </Heading>
              </>
            )}
            {variant === 'manager' && <AccordionIcon />}
          </Grid>
        </AccordionButton>
        <Box flex={1} minW={variant !== 'manager' ? '100px' : undefined}>
          {variant === 'manager' ? (
            <HStack w="100%">
              <Button onClick={onEdit}>Edit Bike</Button>
              <Button onClick={onDelete}>Delete Bike</Button>
            </HStack>
          ) : (
            bike.rentedData.length === 0 &&
            filter && (
              <BookBike bike={bike} filter={filter} onSuccess={onSuccess} />
            )
          )}
        </Box>
      </HStack>
      {variant === 'manager' && (
        <AccordionPanel pb={4}>
          <Heading size="md">Rented Data</Heading>
          {bike?.rentedData?.map?.((rented) => (
            <Grid
              key={rented.id}
              width={'100%'}
              templateColumns="repeat(5, 1fr)"
              gap={6}
            >
              <Heading size="sm">User: {rented.user.name}</Heading>
              <Heading size="sm">
                Rented From : {formatDisplayDate(rented.startDate)}
              </Heading>
              <Heading size="sm">
                Rented To : {formatDisplayDate(rented.endDate)}
              </Heading>
              <Heading size="sm">
                Rating:
                {rented.BikeRating ? rented.BikeRating.rating : 'No Rating'}
              </Heading>
              <HStack>
                <Heading size="sm">Canceled</Heading>
                <Checkbox isChecked={rented.isCanceled} />
              </HStack>
            </Grid>
          ))}
        </AccordionPanel>
      )}
    </AccordionItem>
  );
}

export { BikeDetail };
