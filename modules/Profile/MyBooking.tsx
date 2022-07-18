import { Grid, Heading, Spinner } from '@chakra-ui/react';
import { Rentedbike } from '../../uikit/RentedBike';
import { formatDisplayDate } from '../../utils/formatDate';
import { useOwnData } from './GetOwnDataService';

function MyBooking() {
  const { data, isLoading, refetch } = useOwnData();
  return (
    <>
      {isLoading && <Spinner />}
      {data?.RentedBike?.map?.((rented) => (
        <Rentedbike rentedBike={rented} key={rented.id} onSuccess={refetch} />
      ))}
    </>
  );
}

export { MyBooking };
