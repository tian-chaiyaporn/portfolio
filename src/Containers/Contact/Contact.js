import React, { Component } from 'react';
import './Contact.css'
import contactData from '../../data/contact.json'
import ObjectComponent from '../../Components/JsonComponent/ObjectComponent'

class Contact extends Component {
  constructor() {
    super()
    this.state = {
      contact: contactData
    }
  }
  render() {
    return (
      <div className="container">
        <div className="contact">
          <div className="contact-box">
            <ObjectComponent data={this.state.contact} />
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
