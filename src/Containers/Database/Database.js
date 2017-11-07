import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
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
            <CSSTransitionGroup
              transitionName="typing-heading-database"
              transitionAppear={true}
              transitionAppearTimeout={500}
              transitionEnter={false}
              transitionLeave={false}
            >
              <div className="heading">
                <h1>DATABASE</h1>
                <h4>I.E. RESUME</h4>
              </div>
            </CSSTransitionGroup>
            <CSSTransitionGroup
              transitionName="typing-body-database"
              transitionAppear={true}
              transitionAppearTimeout={2000}
              transitionEnter={false}
              transitionLeave={false}
            >
            <ObjectComponent data={this.state.database} />
            </CSSTransitionGroup>
          </div>

        </div>
      </div>
    );
  }
}

export default Database;
