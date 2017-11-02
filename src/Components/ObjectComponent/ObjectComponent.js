import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid'
import ArrayComponent from '../ArrayComponent/ArrayComponent';

class ObjectComponent extends Component {
  constructor(props) {
    super(props)
    const uniqueComponentId = shortid.generate()
    const uniqueObjButton = 'objectBtn' + uniqueComponentId
    const uniqueArrayButton = 'arrayBtn' + uniqueComponentId

    this.uniqueObjButton = uniqueObjButton
    this.uniqueArrayButton = uniqueArrayButton

    // unique ID for component needed because react setState() function
    // do not distinguish between a parent's recursive component and its child
    // i.e. if a simple name is used for the state, then calling setState on the
    // parent's component will also update child's component
    this.state = {
      [uniqueObjButton]: '...}',
      [uniqueArrayButton]: '...]',
      componentId: shortid.generate()
    }
    this.arrayButton = this.arrayButton.bind(this)
    this.objectButton = this.objectButton.bind(this)
  }

  arrayButton(e, arrayData) {
    e.stopPropagation();
    if (arrayData === 'back') {
      this.setState({[this.uniqueArrayButton]: '...]'})
    } else {
      this.setState({
        [this.uniqueArrayButton]: (<ArrayComponent data={arrayData} nested={true}/>)
      })
    }
  }

  objectButton(e, objectData) {
    e.stopPropagation();
    if (objectData === 'back') {
      this.setState({[this.uniqueObjButton]: '...}'})
    } else {
      this.setState({
        [this.uniqueObjButton]: (<ObjectComponent data={objectData} nested={true}/>)
      })
    }
  }

  render() {
    const data = this.props.data;
    const elem = [];
    const dataLength = Object.keys(data).length;

    const hideObject = this.state[this.uniqueObjButton] !== '...}'
      ? <span style={{float:'right'}}> {'<'} </span>
      : ''

    const hideArray = this.state[this.uniqueArrayButton] !== '...]'
      ? <span style={{float:'right'}}> {'<'} </span>
      : ''

    let counter = 0;
    // loop through each key in object
    for (const key in data) {
      counter++
      // if data is number/string/boolean, return normal {key: number/string}
      if (typeof data[key] === 'string' || typeof data[key] === 'number' || typeof data[key] === 'boolean') {
        elem.push(
          <div key={shortid.generate()} style={{marginLeft: '15px'}}>
            <span>{`${key}: ${data[key]}${counter !== dataLength ? ',' : ''}`}</span>
          </div>
        )
      }
      // if data is array, call ArrayComponent
      else if (Array.isArray(data[key])) {
        const returnElem = (
          <div key={shortid.generate()} style={{marginLeft: '15px'}}>
            <span>{`${key}: [`}</span>
            <span onClick={(e) => this.arrayButton(e, 'back')}>{hideArray}</span>
            <span onClick={(e) => this.arrayButton(e, data[key])}>{this.state[this.uniqueArrayButton]}</span>
          </div>
        )
        elem.push(returnElem)
      }
      // if data is object, call ObjectComponent
      else if (Object.prototype.toString.call(data[key]) === "[object Object]") {
        const returnElem = (
          <div key={shortid.generate()} style={{marginLeft: '15px'}}>
            <span>{`${key}: {`}</span>
            <span onClick={(e) => this.objectButton(e, 'back')}>{hideObject}</span>
            <span onClick={(e) => this.objectButton(e, data[key])}>{this.state[this.uniqueObjButton]}</span>
          </div>
        )
        elem.push(returnElem)
      } else {
        // otherwise, returns undefined
        elem.push(
          <div key={shortid.generate()} style={{marginLeft: '15px'}}>
            <span>{`${key}: undefined${counter !== dataLength ? ',' : ''}`}</span>
          </div>
        )
      }
    }

    return (
      <div className="ObjectComponent">
        { this.props.nested ? '' : '{'}
          {elem}
        { this.props.nested ? '},' : '}'}
      </div>
    );
  }
}


ObjectComponent.propTypes = {
  data: PropTypes.object.isRequired
};

export default ObjectComponent;
