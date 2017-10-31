import React, { Component } from 'react';
import resumeData from '../../data/resume.json'

class Resume extends Component {
  constructor() {
    super()
    this.state = {
      resume: resumeData
    }
  }
  render() {
    return (
      <div className="resume">
        {JSON.stringify(this.state.resume)}
      </div>
    );
  }
}

export default Resume;
