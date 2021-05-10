import * as React from 'react';
import PersonListItem from './PersonListItem';
import { Person } from '../interfaces';

type PersonListProps = {
  items: Person[];
};

const PersonList = ({ items }: PersonListProps) => (
  <ul>
    {items.map(item => (
      <li key={item.id}>
        <PersonListItem data={item} />
      </li>
    ))}
  </ul>
);

export default PersonList;
