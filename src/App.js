import React, { useEffect, useState } from 'react'
import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import Orders from "./Orders";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import AddProducts from './Components/AddProducts';

const promise = loadStripe(
  "pk_test_51IuoBaIC9oqOH2EBYrWzYVxTp2EVRzy4WvtNrYcmnQoCSrmlnymxKMP7MvYLJbdBAT0uuMff57tvoKswnu8qrjag000KlZTWp1"
)

function App() {
  const [{ }, dispatch] = useStateValue();

  useEffect(() => {
    //will only run once when the app component loads... 

    auth.onAuthStateChanged(authUser => {
      // console.log('THE USER IS >>>', authUser);
      if (authUser) {
        //the user just logged in/ the use was logged in 
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        // the use is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  const [searchTerm, setSearchTerm] = useState('');

  return (
    //BEM
    <Router>
      <div className="app">
        <Switch>

          <Route path="/addproducts">
            <AddProducts />
          </Route>

          <Route path="/orders">
            <Header onChange={value => setSearchTerm(value)} />
            <Orders />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/checkout">
            <Header onChange={value => setSearchTerm(value)} />
            <Checkout />
          </Route>

          <Route path="/payment">
            <Header onChange={value => setSearchTerm(value)} />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>

          <Route path="/">
            <Header onChange={value => setSearchTerm(value)} />
            {/* <h1>show typed {searchTerm}</h1> */}
            <Home searchTerm={searchTerm} />
          </Route>

        </Switch>

      </div>
    </Router>

  );
}

export default App;

