import { GetServerSidePropsContext } from 'next';
import { LoginContainer } from '../modules/Login/LoginContainer';
import { Layout } from '../uikit/Layout';

export default function Login() {
  return (
    <Layout>
      <LoginContainer />
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
