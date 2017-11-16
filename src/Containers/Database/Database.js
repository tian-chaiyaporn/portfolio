import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import resumeData from '../../data/resume.json'
import './Database.css'
import ObjectComponent from '../../Components/JsonComponent/ObjectComponent'

class Database extends Component {
  constructor() {
    super()
    this.state = {
      database: resumeData,
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
        <div className="database">
          <div className="database-item">
            <div>
              <div style={{'display': 'inline-block'}}>
                <CSSTransitionGroup
                  transitionName="typing-heading-database"
                  transitionAppear={true}
                  transitionAppearTimeout={800}
                  transitionEnter={false}
                  transitionLeave={false}
                >
                  <div className="heading">
                    <h1>DATABASE</h1>
                    <h4>I.E. RESUME</h4>
                    <button onClick={this.handleClick}>EXPAND ALL</button>
                  </div>
                </CSSTransitionGroup>
              </div>
            </div>

            <div style={{'display': 'inline-block'}}>
              <CSSTransitionGroup
                transitionName="typing-body-database"
                transitionAppear={true}
                transitionAppearTimeout={2500}
                transitionEnter={false}
                transitionLeave={false}
              >
                <ObjectComponent data={this.state.database} expandAll={this.state.expandAll}/>
              </CSSTransitionGroup>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Database;
