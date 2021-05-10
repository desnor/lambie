import * as React from 'react';
import { Person } from '../interfaces';

type PersonListDetailProps = {
  item: Person;
};

const PersonDetail = ({ item: person }: PersonListDetailProps) => (
  <div>
    <h1>Detail for {person.fullName}</h1>
    <p>ID: {person.id}</p>
    <p>Address: {person.address}</p>
  </div>
);

export default PersonDetail;
