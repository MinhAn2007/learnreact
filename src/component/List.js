import React from 'react';

const List = ({users, updateSharedData, del }) => {
    const delUser = (id) => {
        del(id);
    }
    const sendData = (user) => {
        updateSharedData(user);
    }
    return (
        <div>
            <h1>List</h1>
            <ul>
              {users.map((user, index) =>(  
                <li key={index}>
                    {user.name} 
                    {user.company} 
                    <button onClick={() => sendData(user)} >Edit</button>
                    <button onClick={() => delUser(user.id)}>Delete</button>
                </li>
                ))}
            </ul>
        </div>
    );
};

export default List;