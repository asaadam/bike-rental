import {
  Accordion,
  Button,
  Heading,
  HStack,
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
import { useState } from 'react';
import { UserResponse } from '../../types/Auth';
import { ApiError } from '../../types/Error';
import { UserDetail } from '../../uikit/UserDetail';
import { RegisterContainer } from '../Register/RegisterContainer';
import { useDeleteUser } from './DeleteUserService';
import { useGetUsersList } from './GetListUserProfileService';

function ListUsers() {
  const { data, refetch, isLoading } = useGetUsersList();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedData, setSelectedData] = useState<
    UserResponse & {
      isDelete?: true;
    }
  >();

  const { mutate, isLoading: isLoadingDelete } = useDeleteUser();

  const toast = useToast();

  const customClose = () => {
    setSelectedData(undefined);
    onClose();
  };

  const onDelete = () => {
    if (selectedData) {
      mutate(
        { id: selectedData.id },
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
              onDelete={() => {
                setSelectedData({ ...user, isDelete: true });
                onOpen();
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
            {selectedData?.isDelete ? (
              <VStack>
                <Heading size="xs">
                  Are you sure to delete user {selectedData.name}
                </Heading>
                <HStack mt={4} justifyContent="flex-end">
                  <Button
                    isLoading={isLoadingDelete}
                    onClick={onDelete}
                    colorScheme="red"
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={onClose}
                    isLoading={isLoadingDelete}
                    variant="ghost"
                  >
                    Cancel
                  </Button>
                </HStack>
              </VStack>
            ) : (
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
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export { ListUsers };
