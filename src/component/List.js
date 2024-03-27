import React, { useEffect, useState } from "react";
import axios from 'axios';

const List = ({ updateSharedData, del }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
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
  
    fetchData(); // Fetch data when component mounts
  }, []);
  const delUser = (id) => {
    del(id);
  };

  const sendData = (user) => {
    updateSharedData(user);
  };

  return (
    <div>
      <h1>List</h1>
      <table className="border border-gray-400 w-1/2 mx-auto">
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {!data.length ? ( // Check if users data is empty
            <tr>
              <td colSpan="3">No data found.</td>
            </tr>
          ) : (
            data.map((user, index) => (
              <tr className="mb-4" key={index}>
                <td className="border-gray-400 px-4 py-2">
                  <span className="font-semibold hover:underline cursor-pointer">
                    {user.firstName}
                  </span>
                </td>
                <td className="border-gray-400 px-4 py-2">
                  <span className="font-semibold hover:underline cursor-pointer">
                    {user.lastName}
                  </span>
                </td>
                <td className="border-gray-400 px-4 py-2">
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default List;
