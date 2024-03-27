
import React, { useEffect, useState } from 'react';
import './App.css';
import List from './component/List';
import Form from './component/Form';
import LoginForm from './component/LoginForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes from v6

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginForm />} /> 
        <Route path="/list" element={<List />} /> 
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [data, setData] = useState([]);

//   const fetchData = async () => {
//     try {
//       const response = await fetch('http://localhost:3002/users');
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const fetchedData = await response.json();
//       setData(fetchedData);
//     } catch (error) {
//       console.error('There was a problem with the fetch request:', error);
//     }
//   };

//   useEffect(() => {
//     if (isLoggedIn) {
//       fetchData(); // Fetch data only when logged in
//     }
//   }, [isLoggedIn]); // Dependency array

//   const add = async (user) => {
//     try {
//       const response = await fetch('http://localhost:3002/users', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(user),
//       });
//       if (!response.ok) {
//         throw new Error('Error adding user');
//       }
//       await fetchData(); // Refetch data after successful addition
//     } catch (error) {
//       console.error('Error adding user:', error);
//     }
//   };

//   const del = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:3002/users/${id}`, {
//         method: 'DELETE',
//       });
//       if (!response.ok) {
//         throw new Error('Error deleting user');
//       }
//       await fetchData(); // Refetch data after successful deletion
//     } catch (error) {
//       console.error('Delete error:', error);
//     }
//   };

//   const update = async (id, user) => {
//     try {
//       const response = await fetch(`http://localhost:3002/users/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(user),
//       });
//       if (!response.ok) {
//         throw new Error('Error updating user');
//       }
//       await fetchData(); // Refetch data after successful update
//     } catch (error) {
//       console.error('Update error:', error);
//     }
//   };

//   const handleLoginSuccess = () => {
//     console.log('Login success');
//     setIsLoggedIn(true);
//   };

//   return (
//     <div className="App">
//       {isLoggedIn ? (
//         <div>
//           <h1>React App CRUD</h1>
//           <Form add={add} update={update} />
//           <List users={data} del={del} />
//         </div>
//       ) : (
//         <LoginForm onLoginSuccess={handleLoginSuccess} />
//       )}
//     </div>
//   );
// }

// export default App;