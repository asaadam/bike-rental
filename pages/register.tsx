import { GetServerSidePropsContext } from 'next';
import { LoginContainer } from '../modules/Login/LoginContainer';
import { RegisterContainer } from '../modules/Register/RegisterContainer';
import { Layout } from '../uikit/Layout';

export default function Login() {
  return (
    <Layout>
      <RegisterContainer />
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  //clear cookies and redirect to login
  if (context.req.cookies.token) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  return {};
}
