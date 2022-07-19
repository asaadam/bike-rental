import {
  Accordion,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { UserResponse } from '../../types/Auth';
import { UserDetail } from '../../uikit/UserDetail';
import { RegisterContainer } from '../Register/RegisterContainer';
import { useGetUsersList } from './GetListUserProfileService';

function ListUsers() {
  const { data, refetch, isLoading } = useGetUsersList();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedData, setSelectedData] = useState<UserResponse>();

  const customClose = () => {
    setSelectedData(undefined);
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} mb={4}>
        Create User{' '}
      </Button>
      <Accordion allowMultiple width={'100%'}>
        {isLoading ? (
          <Spinner />
        ) : data?.length ? (
          data.map?.((user) => (
            <UserDetail
              user={user}
              key={user.id}
              onEdit={() => {
                onOpen();
                setSelectedData(user);
              }}
            />
          ))
        ) : (
          <Heading>No Data</Heading>
        )}
      </Accordion>
      <Modal isOpen={isOpen} onClose={customClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RegisterContainer
              defaultValues={
                selectedData && {
                  ...selectedData,
                  password: '',
                  rePassword: '',
                }
              }
              variant="manager"
              onSuccess={() => {
                onClose();
                refetch();
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export { ListUsers };
