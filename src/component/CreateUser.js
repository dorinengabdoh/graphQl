import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { FormattedMessage } from "react-intl";
import { gql } from '@apollo/client';

function CreateUserForm() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birth_date, setBirthdate] = useState("");
  const [gender, setGender] = useState("");

  const GET_USERS = gql`
  query {
    all_users {
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
  mutation AddNewUser(
    $first_name: String!,
    $last_name: String!,
    $email: String!,
    $birth_date: String!,
    $gender: String!
  ) {
    add_new_user(
      first_name: $first_name,
      last_name: $last_name,
      email: $email,
      birth_date: $birth_date,
      gender: $gender
    ) {
      id
      first_name
      last_name
      email
      birth_date
      gender
    }
  }
`;


  const [add_new_user] = useMutation(CREATE_USER, {
    update(cache, { data: { createUser } }) {
      const { users } = cache.readQuery({ query: GET_USERS });
      cache.writeQuery({
        query: GET_USERS,
        data: { users: users.concat([createUser]) },
      });
    },
  });

  const handleCreateUser = () => {
    add_new_user({
      variables: {
        first_name,
        last_name,
        email,
        birth_date,
        gender
      }
    });
    setFirstName("");
    setLastName("");
    setEmail("");
    setBirthdate("");
    setGender("");
  };
  
  return (
    <div>
      <h2>
        <FormattedMessage id="createUser" />
      </h2>
      <input
        type="text"
        placeholder={<firstName id="firstName" />}
        value={first_name}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder={<lastName id="lastName" />}
        value={last_name}
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
