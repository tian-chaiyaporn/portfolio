import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import './Contact.css'
import contactData from '../../data/contact.json'
import profile from '../../data/profile-picture.txt'
import ObjectComponent from '../../Components/JsonComponent/ObjectComponent'

class Contact extends Component {
  constructor() {
    super()
    this.state = {
      contact: contactData,
      profile: "initial",
    }
  }

  componentDidMount() {
    fetch(profile)
      .then(response => response.text())
      .then(text => this.setState({profile: text}))
  }

  render() {
    return (
      <div className="container">
        <div className="contact">
          <div className="contact-box">
            <CSSTransitionGroup
              transitionName="typing-heading"
              transitionAppear={true}
              transitionAppearTimeout={1000}
              transitionEnter={false}
              transitionLeave={false}
            >
              <h1 className="heading">CONTACT</h1>
            </CSSTransitionGroup>
            <CSSTransitionGroup
              transitionName="typing-body-contact"
              transitionAppear={true}
              transitionAppearTimeout={2000}
              transitionEnter={false}
              transitionLeave={false}
            >
              <ObjectComponent data={this.state.contact} />
            </CSSTransitionGroup>
            <CSSTransitionGroup
              transitionName="typing-profile"
              transitionAppear={true}
              transitionAppearTimeout={4000}
              transitionEnter={false}
              transitionLeave={false}
            >
              <p className='profile'>{this.state.profile}</p>
            </CSSTransitionGroup>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
