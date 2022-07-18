import {
  Accordion,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { UserDetail } from '../../uikit/UserDetail';
import { RegisterContainer } from '../Register/RegisterContainer';
import { useGetUsersList } from './GetListUserProfileService';

function ListUsers() {
  const { data, refetch } = useGetUsersList();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} mb={4}>
        Create User{' '}
      </Button>
      <Accordion allowMultiple width={'100%'}>
        {data?.map?.((user) => (
          <UserDetail user={user} key={user.id} />
        ))}
      </Accordion>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Bike</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RegisterContainer variant="admin" onSuccess={() => refetch()} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export { ListUsers };
