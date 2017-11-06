import React, { Component } from 'react';
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
            <h1>CONTACT</h1>
            <ObjectComponent data={this.state.contact} />
            <p className='profile'>{this.state.profile}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
