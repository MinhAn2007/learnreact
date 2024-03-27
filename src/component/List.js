import React, { useEffect, useState } from "react";
import axios from 'axios';
import Form from "./Form";

const List = ({}) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get("http://localhost:3002/users", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("response:", response);
      const fetchedData = response.data;
      console.log("fetchedData:", fetchedData);
      setData(fetchedData);
    } catch (error) {
      console.error("There was a problem with the fetch request:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const delUser = async (id) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`http://localhost:3002/users/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      await fetchData(); 
    } catch (error) {
      setError('Bạn không có quyền Xóa ');
      console.error('Delete error:', error);
    }
  };

  const editUser = (user) => {
    setSelectedUser(user); 
  };
  const add = async (user) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.post('http://localhost:3002/users', user, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      await fetchData();
    } catch (error) {
      setError('Bạn không có quyền Thêm');
      console.error('Error adding user:', error);
    }
  };

  const update = async (id, user) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.put(`http://localhost:3002/users/${id}`, user, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      await fetchData();
    } catch (error) {
      setError('Bạn không có quyền Update');
      console.error('Update error:', error);
    }
  };
  return (
    <div className="container mx-auto">
      {error && <div  className="text-red-500 mb-4" >{error}</div>}

      <Form add={add} update={update} selectedUser={selectedUser}  />
      <h1 className="text-3xl font-bold mb-4">List</h1>
      <table className="w-full border border-gray-400 rounded-md shadow-md">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Company</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {!data.length ? (
            <tr className="text-center">
              <td colSpan="3" className="py-4">No data found.</td>
            </tr>
          ) : (
            data.map((user, index) => (
              <tr key={index} className="border-b border-gray-400 hover:bg-gray-100">
                <td className="px-4 py-2">
                  <span className="font-medium hover:underline cursor-pointer">
                    {user.firstName}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span className="font-medium hover:underline cursor-pointer">
                    {user.lastName}
                  </span>
                </td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => editUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={() => delUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default List;
