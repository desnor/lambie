import { Amplify, API, withSSRContext } from 'aws-amplify';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import PersonDetail from '../../components/PersonDetail';
import { Person } from '../../interfaces';
import awsExports from '../../src/aws-exports';
import { deletePerson } from '../../src/graphql/mutations';
import { getPerson, listPersons } from '../../src/graphql/queries';

type PersonPageProps = {
  item?: Person;
  errors?: string;
};

Amplify.configure({ ...awsExports, ssr: true });

export const getStaticPaths: GetStaticPaths = async function getStaticPaths() {
  const SSR = withSSRContext();
  const {
    data: {
      listPersons: { items }
    }
  }: { data: { listPersons: { items: Person[] } } } = await SSR.API.graphql({
    query: listPersons
  });

  const paths = items.map(person => ({
    params: { id: person.id.toString() }
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return {
    fallback: true,
    paths
  };
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async function getStaticProps({
  params
}) {
  const SSR = withSSRContext();
  const { data } = await SSR.API.graphql({
    query: getPerson,
    variables: {
      id: params?.id
    }
  });

  return {
    props: {
      item: data.getPerson
    }
  };
};

export default function PersonPage({ item: person, errors }: PersonPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div>
        <h1>Loading&hellip;</h1>
      </div>
    );
  }
  if (errors) {
    return (
      <Layout title="Error">
        <p>
          <span style={{ color: 'red' }}>Error:</span> {errors}
        </p>
      </Layout>
    );
  }

  async function handleDelete() {
    try {
      await API.graphql({
        authMode: 'AMAZON_COGNITO_USER_POOLS' as any,
        query: deletePerson,
        variables: {
          input: { id: person?.id }
        }
      });

      window.location.href = '/';
    } catch ({ errors }) {
      console.error(...errors);
      throw new Error(errors[0].message);
    }
  }

  return (
    <Layout title={person?.fullName ?? 'Person'}>
      {person && <PersonDetail item={person} />}

      <button onClick={handleDelete}>💥 Delete person</button>
    </Layout>
  );
}
