'use client';

import { Role, User } from '@prisma/client';
import { updateUser } from '@server/actions/user';

const roles = [Role.ADMIN, Role.USER];

const UsersTable = ({ users }: { users: User[] }) => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left border border-gray-200">
                Name
              </th>
              <th className="px-4 py-2 text-left border border-gray-200">
                Email
              </th>
              <th className="px-4 py-2 text-left border border-gray-200">
                Role
              </th>
              <th className="px-4 py-2 text-left border border-gray-200">
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-200">
                  {user.name}
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  {user.email}
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  <select
                    value={user.role}
                    onChange={async e => {
                      await updateUser({
                        id: user.id,
                        role: e.target.value as Role,
                        name: user.name,
                        email: user.email,
                      });
                    }}
                    className="py-1 px-2 border rounded"
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  {user.createdAt.toDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
