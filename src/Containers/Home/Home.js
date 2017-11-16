import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import './Home.css'
import homeData from '../../data/metadata.json'
import ObjectComponent from '../../Components/JsonComponent/ObjectComponent'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      data: homeData,
    }
  }

  render() {
    return (
      <div className="container">
        <div className="home">
          <div className="home-item">
            <div>
              <div style={{'display': 'inline-block'}}>
                <CSSTransitionGroup
                  transitionName="typing-heading-home"
                  transitionAppear={true}
                  transitionAppearTimeout={1000}
                  transitionEnter={false}
                  transitionLeave={false}
                >
                  <h1 className="heading">METADATA</h1>
                </CSSTransitionGroup>
              </div>
            </div>
            <div style={{'display': 'inline-block'}}>
              <CSSTransitionGroup
                transitionName="typing-body-home"
                transitionAppear={true}
                transitionAppearTimeout={2000}
                transitionEnter={false}
                transitionLeave={false}
              >
                <ObjectComponent data={this.state.data} />
              </CSSTransitionGroup>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
