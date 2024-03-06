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
            setForm({name:'', company:''});
        }
        else if(form.name.length <= 0  || form.company.length <= 0) 
            alert('Please fill the form');
        else {
            console.log(form.name, form.company);
            add(form);
            setForm({name:'', company:''});
        }
        
    }
    return (
        <div>
          <form onSubmit={handleSubmit}>
            <h1>Form</h1>
            <input value={form.name} onChange={handleChange} name='name' type="text" placeholder="Name" />
            <input value={form.company} onChange={handleChange} name='company'  type="text" placeholder="Company" />
            <button>{title}</button>  
            </form>
        </div>
    );
};

export default Form;
