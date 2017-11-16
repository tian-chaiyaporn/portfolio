import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import sampleWorkData from '../../data/sample-work.json'
import './SampleWork.css'
import ObjectComponent from '../../Components/JsonComponent/ObjectComponent'

class SampleWork extends Component {
  constructor() {
    super()
    this.state = {
      sampleWork: sampleWorkData,
      expandAll: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({expandAll: true})
  }

  render() {
    return (
      <div className="container">
        <div className="sample-work">
          <div className="sample-work-item">
            <div>
              <div style={{'display': 'inline-block'}}>
                <CSSTransitionGroup
                  transitionName="typing-heading"
                  transitionAppear={true}
                  transitionAppearTimeout={1000}
                  transitionEnter={false}
                  transitionLeave={false}
                >
                  <div className="heading">
                    <h1>SAMPLE WORKS</h1>
                    <button onClick={this.handleClick}>EXPAND ALL</button>
                  </div>
                </CSSTransitionGroup>
              </div>
            </div>
            <div style={{'display': 'inline-block'}}>
              <CSSTransitionGroup
                transitionName="typing-body-sample"
                transitionAppear={true}
                transitionAppearTimeout={1200}
                transitionEnter={false}
                transitionLeave={false}
              >
                <ObjectComponent data={this.state.sampleWork} expandAll={this.state.expandAll} />
              </CSSTransitionGroup>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SampleWork;
