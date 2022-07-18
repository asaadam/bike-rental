import { GetServerSidePropsContext } from 'next';

export default function logout() {
  return null;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  //clear cookies and redirect to login
  context.res.setHeader('Set-Cookie', [
    `token=deleted; Max-Age=0; path=/`,
    `isLoggedIn=deleted; Max-Age=0; path=/`,
  ]);

  return {
    redirect: {
      permanent: false,
      destination: '/login',
    },
  };
}
