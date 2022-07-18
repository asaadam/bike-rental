import { Accordion, Button } from '@chakra-ui/react';
import { UserDetail } from '../../uikit/UserDetail';
import { useGetUsersList } from './GetListUserProfileService';

function ListUsers() {
  const { data } = useGetUsersList();
  return (
    <div>
      <Accordion allowMultiple width={'100%'}>
        {data?.map((user) => (
          <UserDetail user={user} key={user.id} />
        ))}
      </Accordion>
    </div>
  );
}

export { ListUsers };
