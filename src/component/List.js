import React from "react";

const List = ({ users, updateSharedData, del }) => {
  const delUser = (id) => {
    del(id);
  };
  const sendData = (user) => {
    updateSharedData(user);
  };
  return (
    <div>
      <h1>List</h1>
      <table 
        className="border border-gray-400 w-1/2 mx-auto"
      >
      <thead>
        <tr>
            <th>
                Name
            </th>
            <th>
                Company
            </th>
            <th>
                Action
            </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr className="mb-4" key={index}>
        <td className=" border-gray-400 px-4 py-2 ">
          <span className="font-semibold hover:underline cursor-pointer">
            {user.name}      
          </span>
        </td>
        <td className=" border-gray-400 px-4 py-2">
          <span className="font-semibold hover:underline cursor-pointer">
            {user.company}
          </span>
        </td>
        <td className=" border-gray-400 px-4 py-2">
          <button
            className="bg-slate-400 border border-black px-2 py-1 mr-2"
            onClick={() => sendData(user)}
          >
            Edit
          </button>
          <button
            className="bg-slate-400 border border-black px-2 py-1"
            onClick={() => delUser(user.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
      </tbody>
      </table>

    </div>
  );
};

export default List;
