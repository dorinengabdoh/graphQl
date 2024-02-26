import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { FormattedMessage } from "react-intl";
import { gql } from "@apollo/client";
import "../App.css";
import MESSAGES_FR from "../translation";

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
  console.log(data);

  const UpdateUser = () => {
    const [value, setValue] = useState({
      firstName: "",
      lastName: "",
      email: "",
      birth_date: "",
      gender: "",
    });

    const handleUpdate =(event)=>{
      event.preventDefault();
    }
    return (
      <div className="d-flex w-100 vh-100 justify-content-center align-items-center gb-light">
        <div className="w-50 border bg-whiteshadow px-5 pt-3 pb-5 rounded">
          <h2>
            <FormattedMessage id="updateUser" />
          </h2>
          <form onSubmit={handleUpdate}>
            <div className="mb-2">
              <label htmlFor="firstName"> </label>
              <input
                name="firstName"
                type="text"
                placeholder={MESSAGES_FR.firstName}
                className="form-control"
                value={data.all_users.first_name}
                onChange={(e) =>
                  setValue({ ...value, firstName: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <label htmlFor="lastName">data.all_users.last_name </label>
              <input
                name="lastName"
                type="text"
                placeholder={MESSAGES_FR.lastName}
                className="form-control"
                value={data.all_users.lastName}
                onChange={(e) =>
                  setValue({ ...value, lastName: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <label htmlFor="email">data.all_users.email </label>
              <input
                name="email"
                type="email"
                placeholder={MESSAGES_FR.email}
                className="form-control"
                value={data.all_users.email}
                onChange={(e) => setValue({ ...value, email: e.target.value })}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="birth_date">data.all_users.birth_date </label>
              <input
                name="birth_date"
                type="date"
                placeholder={MESSAGES_FR.date}
                className="form-control"
                value={data.all_users.birth_date}
                onChange={(e) =>
                  setValue({ ...value, birth_date: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <label htmlFor="gender">data.all_users.gender </label>
              <input
                name="gender"
                type="text"
                placeholder={MESSAGES_FR.gender}
                className="form-control"
                value={data.all_users.gender}
                onChange={(e) => setValue({ ...value, gender: e.target.value })}
              />
            </div>
            <button className="btn btn-success">
              <FormattedMessage id="updateUser" />
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="d-flex flex-column jsutify-content-center align-items-center bg-light vh-10">
      <h1>Users List</h1>
      <div className="W-75 rounded bg-while border shoow p-6">
        <table className="table table-stipend ">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Email</th>
              <th>Birth_date</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.all_users.map((user) => (
              <tr className="all" key={user.id}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.birth_date}</td>
                <td>{user.gender}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary m-2"
                    onClick={UpdateUser}
                  >
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger m-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default UserList;
