import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid'
import ArrayComponent from '../ArrayComponent/ArrayComponent';

class ObjectComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      objectBtn: '...}'
    }
    this.arrayButton = this.arrayButton.bind(this)
    this.objectButton = this.objectButton.bind(this)
  }

  arrayButton(arrayData) {
    return <ArrayComponent data={arrayData}/>
  }

  objectButton(objectData) {
    this.setState({
      objectBtn: <ObjectComponent data={objectData} nested={true}/>
    })
  }

  render() {
    const data = this.props.data;
    const elem = [];
    const dataLength = Object.keys(data).length;
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
            <span>{`${key}: `}</span><ArrayComponent data={data[key]}/>
          </div>
        )
        elem.push(returnElem)
      }
      // if data is object, call ObjectComponent
      else if (Object.prototype.toString.call(data[key]) === "[object Object]") {
        const returnElem = (
          <div key={shortid.generate()} style={{marginLeft: '15px'}}>
            <span>{`${key}: {`}</span>
            <span onClick={() => this.objectButton(data[key])}>{this.state.objectBtn}</span>
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
