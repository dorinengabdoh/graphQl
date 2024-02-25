import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { FormattedMessage } from "react-intl";
import { gql } from '@apollo/client';



export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      firstName
      lastName
      email
    }
  }
`;

function UpdateUserForm(userData) {
  const user = userData;
  const [first_name, setFirstName] = useState(user.firstName);
  const [last_name, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [birth_date, setBirthdate] = useState(user.email);
  const [gender, setGender] = useState(user.email);
  const [editUser] = useMutation(UPDATE_USER);

  const handleUpdateUser = () => {
    editUser({
      variables: {
        id: user.id,
        input: {
          first_name,
          last_name,
          email,
          birth_date,
          gender,
        },
      },
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="First Name"
        value={first_name}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={last_name}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Birth Date"
        value={birth_date}
        onChange={(e) => setBirthdate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      />
    </div>
  );
}

export default UpdateUserForm;
