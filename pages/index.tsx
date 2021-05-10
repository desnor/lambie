import Link from 'next/link';
import Layout from '../components/Layout';

import {
  AmplifyAuthenticator,
  AmplifyButton,
  AmplifyContainer
} from '@aws-amplify/ui-react';
import { Amplify, API, Auth, withSSRContext } from 'aws-amplify';
import awsExports from '../src/aws-exports';
import { createPerson } from '../src/graphql/mutations';
import { listPersons } from '../src/graphql/queries';
import { GetServerSideProps } from 'next';
import { Person } from '../interfaces';
import { FormEvent } from 'react';

Amplify.configure({ ...awsExports, ssr: true });

export const getServerSideProps: GetServerSideProps<IndexProps> = async ({
  req
}) => {
  const SSR = withSSRContext({ req });
  const response = await SSR.API.graphql({ query: listPersons });

  return {
    props: {
      people: response.data.listPersons.items
    }
  };
};

async function handleCreatePerson(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const form = new FormData(event.currentTarget);

  try {
    const { data }: any = await API.graphql({
      authMode: 'AMAZON_COGNITO_USER_POOLS' as any,
      query: createPerson,
      variables: {
        input: {
          fullName: form.get('fullName'),
          address: form.get('address')
        }
      }
    });

    window.location.href = `/people/${data.createPerson.id}`;
  } catch ({ errors }) {
    console.error(...errors);
    throw new Error(errors[0].message);
  }
}

type IndexProps = {
  people: Person[];
};

export default function Index({ people = [] }: IndexProps) {
  return (
    <Layout title="Home">
      <main>
        <h1>Bail Out!</h1>

        <p>
          Found: <code>{people.length}</code> people
        </p>

        <div>
          {people.map(person => (
            <Link href={`/people/${person.id}`} key={person.id}>
              <a>
                <h3>{person.fullName}</h3>
                <p>{person.address}</p>
              </a>
            </Link>
          ))}

          <AmplifyContainer>
            <div>
              <h2>Add Person</h2>

              <AmplifyAuthenticator>
                <form onSubmit={handleCreatePerson}>
                  <fieldset>
                    <legend>Full Name</legend>
                    <input placeholder={'Full Name...'} name="fullName" />
                  </fieldset>

                  <fieldset>
                    <legend>Address</legend>
                    <textarea placeholder="Add Address..." name="address" />
                  </fieldset>

                  <button type="submit">Add Person</button>
                  <AmplifyButton type="button" onClick={() => Auth.signOut()}>
                    Sign out
                  </AmplifyButton>
                </form>
              </AmplifyAuthenticator>
            </div>
          </AmplifyContainer>
        </div>
      </main>
    </Layout>
  );
}
