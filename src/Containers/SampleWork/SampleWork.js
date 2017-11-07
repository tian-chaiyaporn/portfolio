import React, { Component } from 'react';
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
            <h1>SAMPLE WORKS</h1>
            <ObjectComponent data={this.state.sampleWork} />
          </div>
        </div>
      </div>
    );
  }
}

export default SampleWork;
