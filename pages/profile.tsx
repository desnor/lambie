import Link from 'next/link';
import Layout from '../components/Layout';

const ProfilePage = () => (
  <Layout title="Profile">
    <h1>Profile</h1>
    <p>This is your profile page</p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

export default ProfilePage;
