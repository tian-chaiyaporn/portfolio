import React, { Component } from 'react';
import Home from './Containers/Home/Home'
import Contact from './Containers/Contact/Contact'
import Database from './Containers/Database/Database'
import SampleWork from './Containers/SampleWork/SampleWork'
import Navigation from './Components/Navigation/Navigation'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import './App.css'

class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/portfolio">
        <div className="route-container">
          <div className="route-container-item">
            <Route path="/" component={Navigation} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/database" component={Database} />
              <Route exact path="/sample-work" component={SampleWork} />
              <Route render={() => (
                  <div>
                    <h1>Sorry, This Page Cannot Be Found</h1>
                    <Link to='/'>Back To Home</Link>
                  </div>
                )}
              />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
