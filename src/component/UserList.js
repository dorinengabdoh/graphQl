import React from "react";
import { useQuery } from "@apollo/client";
import { FormattedMessage } from "react-intl";
import { gql } from "@apollo/client";

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

function UserList() {
  const { loading, error, data } = useQuery(GET_USERS);
  if (loading) return <FormattedMessage id="loading" />;
  if (error) return <FormattedMessage id="error" />;

  return (
    <div>
      <h2>
        <FormattedMessage id="users" />
      </h2>
      <ul>
        {data.all_users.map((user) => (
          <li key={user.id}>
            {user.first_name}  {user.last_name}  {user.email}  {user.birth_date}
            {user.gender}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default UserList;
