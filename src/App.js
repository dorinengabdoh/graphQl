import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { IntlProvider, FormattedMessage } from 'react-intl';
import UserList from './component/UserList';
import CreateUserForm from './component/CreateUser';
import { MESSAGES_FR } from './translation';
import DeleteUserButton from './component/DeleteUserButton';
import UpdateUserForm from './component/UpdateUserForm';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <IntlProvider locale="fr" messages={MESSAGES_FR}>
        <div>
          <h1>
            <FormattedMessage id="title" />
          </h1>
          <UserList />
          <CreateUserForm />
          <UpdateUserForm/>
          <DeleteUserButton/>
        </div>
      </IntlProvider>
    </ApolloProvider>
  );
}

export default App;