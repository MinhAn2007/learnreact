import React, { useEffect } from 'react';
import  { useState } from 'react';
const Form = ({add,update,sharedData}) => {
    const title = sharedData.id ? 'Update' : 'Add';
    useEffect(() => {
       setForm(sharedData);
    },[sharedData]);
    const [form, setForm] = useState({name:'', company:''});
    
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form.company.length);
        if(title === 'Update') {
            update(form)
            setForm({name:'', company:'', id:null});
            sharedData.id = null;
        }
        else if(form.name.length <= 0  || form.company.length <= 0) 
            alert('Please fill the form');
        else {
            console.log(form.name, form.company);
            add(form);
            setForm({name:'', company:'', id:null});
        }
        
    }
    return (
        <div>
          <form onSubmit={handleSubmit}>
          <h1 className="text-5xl font-bold underline"> Form </h1>
            <input
             className='border-2 border-black p-2 m-2 w-1/2'
             value={form.name} onChange={handleChange} name='name' type="text" placeholder="Name" />
            <input
            className='border-2 border-black p-2 m-2 w-1/2'
             value={form.company} onChange={handleChange} name='company'  type="text" placeholder="Company" />
             <br />
            <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >{title}</button>  
            </form>
        </div>
    );
};

export default Form;
