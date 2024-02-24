import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { FormattedMessage } from 'react-intl';
import { UPDATE_USER } from './queries';

function UpdateUserForm({ user }) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [birth_date, setBirthdate] = useState(user.email);
  const [gender, setGender] = useState(user.email);


  const [updateUser] = useMutation(UPDATE_USER);

  const handleUpdateUser = () => {
    updateUser({
      variables: {
        id: user.id,
        input: {
          firstName,
          lastName,
          email,
          birth_date,
          gender
        },
      },
    });
  };

  return (
    <div>
      <h2>
        <FormattedMessage id="updateUser" />
      </h2>
      <input
        type="text"
        placeholder={<FormattedMessage id="firstName" />}
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder={<FormattedMessage id="lastName" />}
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
        placeholder={<FormattedMessage id="birth_date" />}
        value={birth_date}
        onChange={(e) => setBirthdate(e.target.value)}
      />
           <input
        type="birth_date"
        placeholder={<FormattedMessage id="birth_date" />}
        value={birth_date}
        onChange={(e) => setGender(e.target.value)}
      />
      <button onClick={handleUpdateUser}>
        <FormattedMessage id="update" />
      </button>
    </div>
  );
}

export default UpdateUserForm;