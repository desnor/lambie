/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePerson = /* GraphQL */ `
  subscription OnCreatePerson($owner: String) {
    onCreatePerson(owner: $owner) {
      id
      fullName
      address
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdatePerson = /* GraphQL */ `
  subscription OnUpdatePerson($owner: String) {
    onUpdatePerson(owner: $owner) {
      id
      fullName
      address
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeletePerson = /* GraphQL */ `
  subscription OnDeletePerson($owner: String) {
    onDeletePerson(owner: $owner) {
      id
      fullName
      address
      createdAt
      updatedAt
      owner
    }
  }
`;
