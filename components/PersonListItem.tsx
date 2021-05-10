import React from 'react';
import Link from 'next/link';

import { Person } from '../interfaces';

type PersonListItemProps = {
  data: Person;
};

const PersonListItem = ({ data: person }: PersonListItemProps) => (
  <Link href="/people/[id]" as={`/people/${person.id}`}>
    <a>
      {person.fullName}: {person.address}
    </a>
  </Link>
);

export default PersonListItem;
