import React from "react";
import { useQuery } from "@apollo/client";
import { FormattedMessage } from "react-intl";
import { gql } from "@apollo/client";
import "../App.css";
import UpdateUserForm from "./UpdateUserForm";


const GET_USERS = gql`
  query {
    all_users {
      id
      first_name
      last_name
      email
      birth_date #
      gender
    }
  }
`;

function UserList() {
  const { loading, error, data } = useQuery(GET_USERS);
  if (loading) return <FormattedMessage id="loading" />;
  if (error) return <FormattedMessage id="error" />;

  return (
    <div className="Alldiv">
      <h2 className="h2">
        <FormattedMessage id="users" />
      </h2>
      <div className="hello">
        <h2>Id</h2>
        <h2>first_name</h2>
        <h2>last_name</h2>
        <h2>email</h2>
        <h2>birth_date</h2>
        <h2>gender</h2>
      </div>
      <div className="display">
        {data.all_users.map((user) => (
          <div className="all" key={user.id}>
            <div>{user.id}</div>
            <div>{user.first_name}</div>
            <div>{user.last_name}</div>
            <div>{user.email}</div>
            <div>{user.birth_date}</div>
            <div>{user.gender}</div>
            <button onClick={UpdateUserForm}>Edit</button>
            <button>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default UserList;
