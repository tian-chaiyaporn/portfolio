import React, { Component } from 'react';
import Home from './Containers/Home/Home'
import Contact from './Containers/Contact/Contact'
import Resume from './Containers/Resume/Resume'
import SampleWork from './Containers/SampleWork/SampleWork'
import Navigation from './Components/Navigation/Navigation'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="route-container">
          <Route path="/" component={Navigation} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/resume" component={Resume} />
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
      </BrowserRouter>
    );
  }
}

export default App;
