import { useEffect,useState } from 'react';
import './App.css';
import List from './component/List';
import Form from './component/Form';

function App() {
  const [sharedData, setSharedData] = useState('');
  const updateSharedData = (newData) => {
    console.log(newData);
    setSharedData(newData);
  };
  const [data, setData] = useState([]);
  const fetchData =() =>fetch('http://localhost:8080/crud/getAll').then(response => response.json()).then(data => setData(data));
   useEffect(() => {
    fetchData();
  }, []);
  
  const add = (user) => {
    fetch('http://localhost:8080/crud/add', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(response => response.json()).then(()=>fetchData())
  }
  const del = (id) => {
    fetch('http://localhost:8080/crud/delete/'+id, {
      method:'DELETE'
    }).then(req => console.log(req)).then(()=>fetchData())
  }
  const update = (user) => {
    fetch('http://localhost:8080/crud/update', {
      method:'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(response => response.json()).then(()=>fetchData())
  }
  return (
    <div className="App">
      <h1>React App CRUD</h1>
      <Form add={add} update={update} sharedData={sharedData}/>
      <List users={data} del={del} updateSharedData={updateSharedData} />
    </div>
  );
}

export default App;
