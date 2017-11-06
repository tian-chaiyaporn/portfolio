import React, { Component } from 'react';
import resumeData from '../../data/resume.json'
import './Database.css'
import ObjectComponent from '../../Components/JsonComponent/ObjectComponent'

class Database extends Component {
  constructor() {
    super()
    this.state = {
      database: resumeData
    }
  }
  render() {
    return (
      <div className="container">
        <div className="database">
          <div className="database-item">
            <h1>DATABASE</h1>
            <h4>I.E. RESUME</h4>
            <ObjectComponent data={this.state.database} />
          </div>
        </div>
      </div>
    );
  }
}

export default Database;
