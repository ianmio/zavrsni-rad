import React from 'react';

import { getAllUsers } from '@server/actions/user';

import UsersTable from '../components/UsersTable';

const Users = async () => {
  const users = await getAllUsers();

  return <UsersTable users={users} />;
};

export default Users;
