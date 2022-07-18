import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react';
import { ListBikeContainer } from '../modules/Bike/ListBike';
import { RegisterContainer } from '../modules/Register/RegisterContainer';
import { Layout } from '../uikit/Layout';

export default function DashboardPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Layout>
      <Tabs isFitted variant="enclosed" width={'100%'}>
        <TabList mb="1em">
          <Tab>Bike</Tab>
          <Tab>Users</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Button>Create bike</Button>
            <ListBikeContainer variant="admin" />
          </TabPanel>
          <TabPanel>
            <Button onClick={onOpen}>Create user</Button>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RegisterContainer variant="admin" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Layout>
  );
}
