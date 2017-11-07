import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import sampleWorkData from '../../data/sample-work.json'
import './SampleWork.css'
import ObjectComponent from '../../Components/JsonComponent/ObjectComponent'

class SampleWork extends Component {
  constructor() {
    super()
    this.state = {
      sampleWork: sampleWorkData
    }
  }
  render() {
    return (
      <div className="container">
        <div className="sample-work">

            <div className="sample-work-item">
              <CSSTransitionGroup
                transitionName="typing-heading"
                transitionAppear={true}
                transitionAppearTimeout={1000}
                transitionEnter={false}
                transitionLeave={false}
              >
                <h1 className="heading">SAMPLE WORKS</h1>
              </CSSTransitionGroup>
              <CSSTransitionGroup
                transitionName="typing-body-sample"
                transitionAppear={true}
                transitionAppearTimeout={1000}
                transitionEnter={false}
                transitionLeave={false}
              >
                <ObjectComponent data={this.state.sampleWork} />
              </CSSTransitionGroup>
            </div>

        </div>
      </div>
    );
  }
}

export default SampleWork;
