import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { FormattedMessage } from "react-intl";
import { gql } from '@apollo/client';

function CreateUserForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birth_date, setBirthdate] = useState("");
  const [gender, setGender] = useState("");

  const GET_USERS = gql`
  query GetUsers {
    users {
      id
      first_name
      last_name
      email
      birth_date
      gender
    }
  }
`;

 const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      first_name
      last_name
      email
      birth_date
      gender
    }
  }
`;

  const [createUser] = useMutation(CREATE_USER, {
    update(cache, { data: { createUser } }) {
      const { users } = cache.readQuery({ query: GET_USERS });
      cache.writeQuery({
        query: GET_USERS,
        data: { users: users.concat([createUser]) },
      });
    },
  });

  const handleCreateUser = () => {
    createUser({
      variables: {
        input: {
          firstName,
          lastName,
          email,
          birth_date,
          gender
        },
      },
    });
    setFirstName("");
    setLastName("");
    setEmail("");
    setBirthdate("");
    setGender("")
  };

  return (
    <div>
      <h2>
        <FormattedMessage id="createUser" />
      </h2>
      <input
        type="text"
        placeholder={<firstName id="firstName" />}
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder={<lastName id="lastName" />}
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="email"
        placeholder={<FormattedMessage id="email" />}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="birth_date"
        placeholder={<FormattedMessage id="date" />}
        value={birth_date}
        onChange={(e) => setBirthdate(e.target.value)}
      />
      <input
        type="gender"
        placeholder={<FormattedMessage id="text" />}
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      />
      <button onClick={handleCreateUser}>
        <FormattedMessage id="create" />
      </button>
    </div>
  );
}

export default CreateUserForm;
