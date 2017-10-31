import React, { Component } from 'react';
import sampleWorkData from '../../data/sample-work.json'

class SampleWork extends Component {
  constructor() {
    super()
    this.state = {
      sampleWork: sampleWorkData
    }
  }
  render() {
    return (
      <div className="sample-work">
        {JSON.stringify(this.state.sampleWork)}
      </div>
    );
  }
}

export default SampleWork;
