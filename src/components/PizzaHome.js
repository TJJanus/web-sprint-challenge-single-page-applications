import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import * as yup from 'yup';

// Name Validity

const formSchema = yup.object().shape({
    name: yup.string().min(2).required('Enter Name please'),
    email: yup.string().email().required("valid email please"),
})

const PizzaHome = (props) => {

    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
    })

    const [errors, setErrors] = useState({
        name: '',
        email: '',
    })

    const [name, setName] = useState([]);
    
    const [buttonDisabled, setButtonDisabled] = useState(true);

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
            setErrors({ ...errors, [event.target.name]: "",});
          })
          .catch((err) => {
            setErrors({ ...errors, [event.target.name]: err.errors[0],
             });
          });
      };
    

    // change event
    const change = (event) => {
        event.persist();
        const newData = {
          ...formValues,
          [event.target.name]: event.target.value,
        };
        validateChange(event);
        setFormValues(newData);
      };

      // submit event / name State

      const submit = (event) => {
          event.preventDefault();
          axios
            .post("https://reqres.in/api/users", formValues)
            .then((res) => {
                setName(res.data);
            
                setFormValues({
                    name: '', 
                })
            })
            .catch((err) => {
                console.log(err.res);
            });
      };

    return (
        <>
        <h2>Welcome to the Home Page</h2>
      <h3>Fill out the form below to proceed with your order</h3>
        <form onSubmit={submit}>
            <label htmlFor='name'>
            Name: 
                <input 
                    id='name'
                    type='text'
                    name='name'
                    value={formValues.name}  
                    onChange={change}
                />
            </label>

            <label htmlFor="email">
            Email: 
                <input 
                    id='email'
                    type='email'
                    name='email'
                    value={formValues.email}  
                    onChange={change}
                />
            </label>
            <Link to="/pizza/">
                <button type='submit' disabled={buttonDisabled}>Place your order here</button>
            </Link>
        </form>
        </>
    );
};


export default PizzaHome;