import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Navigation.css'

class Navigation extends Component {
  constructor() {
    super()
    this.state = {
      contact: false,
      database: false,
      sample: false,
      currentPointer: ''
    }
    this.addAnimation = this.addAnimation.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    document.addEventListener('keypress', this.handleKey);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    document.removeEventListener('keypress', this.handleKey);
  }

  addAnimation(type) {
    this.setState({
      home: type === 'home' ? true : false,
      contact: type === 'contact' ? true : false,
      database: type === 'database' ? true : false,
      sample: type === 'sample' ? true : false,
      currentPointer: type === 'home' ? '' : type === 'sample' ? 'sample-work' : type
    })
  }

  handleKey(event) {
    switch(event.keyCode) {
      case 104 || 72: // h || H
        this.addAnimation('home')
        break;
      case 100 || 68: // d || D
        this.addAnimation('database')
        break;
      case 115 || 83: // s || S
        this.addAnimation('sample')
        break;
      case 99 || 67: // c || C
        this.addAnimation('contact')
        break;
      case 13: // enter key
        this.props.history.push(`/${this.state.currentPointer}`)
        break;
      default:
        this.setState({ home: false, contact: false, database: false, sample: false })
    }
  }

  // function modified from https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ home: false, contact: false, database: false, sample: false})
    }
  }

  setWrapperRef(node) {this.wrapperRef = node}

  render() {
    const homeLink = (
      <p className={`character-link`} onClick={() => this.addAnimation('home')}>
        <span className='txt-bracket'>]</span>
        <Link className={`${this.state.home ? 'enable-click' : 'disable-click'} link`} to={'/'}>
          <span className={`${this.state.home ? 'animationIn' : 'animationOut'} link-text`}><span className='txt'>[HELLO_WORLD</span></span>
        </Link>
      </p>
    )

    const databaseLink = (
      <p className={`character-link`} onClick={() => this.addAnimation('database')}>
        <span className='txt-bracket'>]</span>
        <Link className={`${this.state.database ? 'enable-click' : 'disable-click'} link`} to={'/database'}>
          <span className={`${this.state.database ? 'animationIn' : 'animationOut'} link-text`}><span className='txt'>[DATABASE</span></span>
        </Link>
      </p>
    )

    const sampleLink = (
      <p className={`character-link`} onClick={() => this.addAnimation('sample')}>
        <span className='txt-bracket'>]</span>
        <Link className={`${this.state.sample ? 'enable-click' : 'disable-click'} link`} to={'/sample-work'}>
          <span className={`${this.state.sample ? 'animationIn' : 'animationOut'} link-text`}><span className='txt'>[SAMPLE_WORKS</span></span>
        </Link>
      </p>
    )

    const contactLink = (
      <p className={`character-link`} onClick={() => this.addAnimation('contact')}>
        <span className='txt-bracket'>]</span>
        <Link className={`${this.state.contact ? 'enable-click' : 'disable-click'} link`} to={'/contact'}>
          <span className={`${this.state.contact ? 'animationIn' : 'animationOut'} link-text`}><span className='txt'>[CONTACT</span></span>
        </Link>
      </p>
    )

    return (
      <div className="Navigation" ref={this.setWrapperRef}>
        {homeLink}
        {databaseLink}
        {sampleLink}
        {contactLink}
        <h1 className="background">ME</h1>
        <h1 className="background">NU</h1>
      </div>
    );
  }
}

export default Navigation;
