import React from "react";
import { Route, Switch } from 'react-router-dom';
import PizzaHome from './components/PizzaHome';
import PizzaForm from './components/PizzaForm';

const App = () => {

  return (
    <>
      <h1>Lambda Eats</h1>
      
      

     <Switch>

     <Route path="/pizza/">
        <PizzaForm />
      </Route>

      <Route path="/">
        <PizzaHome />
      </Route>

     
      </Switch>
      
    </>
  );
};
export default App;
