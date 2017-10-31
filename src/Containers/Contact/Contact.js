import React, { Component } from 'react';
import contactData from '../../data/contact.json'

class Contact extends Component {
  constructor() {
    super()
    this.state = {
      contact: contactData
    }
  }
  render() {
    return (
      <div className="contact">
        {JSON.stringify(this.state.contact)}
      </div>
    );
  }
}

export default Contact;
