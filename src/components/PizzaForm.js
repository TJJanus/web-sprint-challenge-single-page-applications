import React, {useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { Link } from "react-router-dom";


//schema

const formSchema = yup.object().shape({
    size: yup.string().required('Please choose a size'),
    sausage: yup.string().notRequired('Please select an option'),
    onions: yup.string().notRequired('Please select an option'),
    peppers: yup.string().notRequired('Please select an option'),
    anchovies: yup.string().notRequired('Please select an option'),
    specialInstructions: yup.string('Other?'),

})



const PizzaForm = (props) => {
    const [formValues, setFormValues] = useState({
        size: '',
        sausage: '',
        onions: '',
        peppers: '',
        anchovies: '',
        specialInstructions: '',

    });

    const [errors, setErrors] = useState({
        
        size: '',
        sausage: '',
        onions: '',
        peppers: '',
        anchovies: '',
        specialInstructions: '',

    });

    const [buttonDisabled, setButtonDisabled]= useState(true);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        formSchema.isValid(formValues).then((valid) => {
          setButtonDisabled(!valid);
        });
      }, [formValues]);


      const validateChange = (event) => {
        yup
          .reach(formSchema, event.target.name)
          .validate(event.target.value)
          .then((valid) => {
            setErrors({
              ...errors,
              [event.target.name]: "",
            });
          })
          .catch((err) => {
            setErrors({
              ...errors,
              [event.target.name]: err.errors[0],
            });
          });
      };

    // Change

    const change = (event) => {
        event.persist();
        const newData = {
            ...formValues, [event.target.name]:
            event.target.type === "checkbox"
              ? event.target.checked
              : event.target.value,
        };
        validateChange(event);
        setFormValues(newData)
    }

    //Submit 

    const submit = (event) => {
        event.preventDefault();
        axios
            .post('https://reqres.in/api/users', formValues)
            .then((res) => {
                setOrder(res.data);
            
                setFormValues({
                    name: '',
                    size: '',
                    sausage: '',

                })
            })
            .catch((err) => {
                console.log(err.res);
            })
    }

    return (
        <>
        <form onSubmit={submit}>
            <label htmlFor='size'>
        Pick your size
        <select 
            id='size'
            name='size' 
            onChange={change} >
            <option value=''>-Please choose a size-</option>
            <option value='small'>small</option>
            <option value='medium'>medium</option>
            <option value='large'>large</option>
        </select>
            </label>
    <br></br>
    <br></br>
            <label htmlFor='toppings'>Choose up to 4 special toppings.</label>
            <br></br>
            <br></br>

            <label htmlFor='sausage'>
             Sausage   
             <input 
                type='checkbox'
                name='sausage'
                checked={formValues.sausage}
                onChange={change}
             />
            </label>
<br></br>
            <label htmlFor='onions'>
             Onions   
             <input 
                type='checkbox'
                name='onions'
                checked={formValues.onions}
                onChange={change}
             />
            </label>
            <br></br>
            <label htmlFor='peppers'>
            Peppers   
             <input 
                type='checkbox'
                name='peppers'
                checked={formValues.peppers}
                onChange={change}
             />
            </label>
            <br></br>
            <label htmlFor='anchovies'>
            Anchovies   
             <input 
                type='checkbox'
                name='anchovies'
                checked={formValues.anchovies}
                onChange={change}
             />
            </label>
            <br></br>
            <label htmlFor='specialInstructions'><br></br>
            Special Instructions   <br></br>
             <textarea 
                name='specialInstructions'
                value={formValues.specialInstructions}
                onChange={change}
             />
            </label>
            <br></br>
            <button name='fun'>Add to order</button>
            <Link to='/'>
            <button>Back to Home</button>
            </Link>
        </form>
        
        <pre>{JSON.stringify(order, null, 2)}</pre>
        
        </>

      
    
        
    )
    


}

export default PizzaForm;

