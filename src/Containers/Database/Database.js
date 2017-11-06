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
            <ObjectComponent data={this.state.database} />
          </div>
        </div>
      </div>
    );
  }
}

export default Database;
