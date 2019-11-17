import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Redirect, useParams} from 'react-router-dom';
import ServiceEdit from './components/ServiceEdit';
import ServiceList from './components/ServiceList';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/">
          <Redirect to="/services" />
        </Route>
        <Route exact path="/services">
          <ServiceList />
        </Route>
        <Route exact path="/services/:id" render={props => <ServiceEdit {...props} />} />
      </Router>
    </div>
  );
}

export default App;
