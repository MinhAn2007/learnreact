import React, { useEffect } from 'react';
import  { useState } from 'react';
const Form = ({add,update,sharedData}) => {
    const title = sharedData.id ? 'Update' : 'Add';
    useEffect(() => {
       setForm(sharedData);
    },[sharedData]);
    const [form, setForm] = useState({firstName:'', lastName:''});
    
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        if(title === 'Update') {
            update(form.id,form)
            setForm({firstName:'', lastName:'', id:null});
            sharedData.id = null;
        }
        else if(form.firstName.length <= 0  || form.lastName.length <= 0) 
            alert('Please fill the form');
        else {
            console.log(form.firstName, form.lastName);
            let newForm = {...form, isActive:true};
            add(newForm);
            setForm({firstName:'', lastName:'', id:null});
        }
        
    }
    return (
        <div>
          <form onSubmit={handleSubmit}>
          <h1 className="text-5xl font-bold underline"> Form </h1>
            <input
             className='border-2 border-black p-2 m-2 w-1/2'
             value={form.firstName} onChange={handleChange} name='firstName' type="text" placeholder="firstName" />
            <input
            className='border-2 border-black p-2 m-2 w-1/2'
             value={form.lastName} onChange={handleChange} name='lastName'  type="text" placeholder="lastName" />
             <br />
            <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >{title}</button>  
            </form>
        </div>
    );
};

export default Form;
