import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { gql } from '@apollo/client';
import MESSAGES_FR from "../translation";
import axios from "axios";

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      firstName
      lastName
      email
      birth_date
      gender
    }
  }
`;

function UpdateUserForm() {
  const [data, setData] =useState([])
  useEffect(()=>{
    axios.get('http://localhost:8000/graphql')
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  },[])
  console.log(data);

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center gb-light">
    <div className="w-50 border bg-whiteshadow px-5 pt-3 pb-5 rounded">
      <h2>
        <FormattedMessage id="updateUser" />
      </h2>
      <div className="mb-2">
        <label htmlFor="firstName">firstName: </label>
        <input
        name="firstName"
          type="text"
          placeholder={MESSAGES_FR.firstName}
          className="form-control"
          value={data.firstName}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="lastName">lastName: </label>
        <input
        name="lastName"
          type="text"
          placeholder={MESSAGES_FR.lastName}
          className="form-control"
          value={data.lastName}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="email">Email: </label>
        <input
        name="email"
          type="email"
          placeholder={MESSAGES_FR.email}
          className="form-control"
          value={data.email}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="birth_date">birth_date: </label>
        <input
        name="birth_date"
          type="date"
          placeholder={MESSAGES_FR.date}
          className="form-control"
          value={data.birth_date}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="gender">Gender: </label>
        <input
        name="gender"
          type="text"
          placeholder={MESSAGES_FR.gender}
          className="form-control"
          value={data.gender}
        />
      </div>

      <button className="btn btn-success">
        <FormattedMessage id="updateUser" />
      </button>
    </div>
  </div>
  );
}

export default UpdateUserForm;