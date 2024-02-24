import React from 'react';
import { useMutation } from '@apollo/client';
// import { FormattedMessage } from 'react-intintl';
import { DELETE_USER, GET_USERS } from './queries';

function DeleteUserButton({ userId }) {
  const [deleteUser] = useMutation(DELETE_USER, {
    update(cache) {
      const { users } = cache.readQuery({ query: GET_USERS });
      cache.writeQuery({
        query: GET_USERS,
        data: { users: users.filter((user) => user.id !== userId) },
      });
    },
  });

  const handleDeleteUser = () => {
    deleteUser({
      variables: {
        id: userId,
      },
    });
  };

  return (
    <button onClick={handleDeleteUser}>
      <FormattedMessage id="delete" />
    </button>
  );
}

export default DeleteUserButton;