import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid'
import ArrayComponent from '../ArrayComponent/ArrayComponent';

class ObjectComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      childBtnState: this.props.savedState && this.props.savedState.childState ? this.props.savedState.childState : [],
      ownBtnState: this.props.savedState && this.props.savedState.ownState
        ? this.props.savedState.ownState.map(s => s)
        : Object.keys(this.props.data).map(k => false),
      componentIndex: this.props.componentIndex ? this.props.componentIndex : 'cannot have componentIndex without hostState and nested prop'
    }
    this.expandButton = this.expandButton.bind(this)
    this.updateChildButtonsState = this.updateChildButtonsState.bind(this)
  }

  componentDidUpdate() {
    this.props.nested && this.props.hoistState(this.state.ownBtnState, this.state.childBtnState, this.state.componentIndex)
  }

  updateChildButtonsState(childButtonsState, grandChildState , index) {
    this.setState((prevState) => {
      let newState = prevState.childBtnState
      newState[index] = {ownState: childButtonsState, childState: grandChildState}
      return {childBtnState: newState}
    })
  }

  // index is used to identify button order, as so to keep its state and pass
  // up to parent so on rerender, it rerenders the same child expand state
  expandButton(e, currentIndex) {
    e.stopPropagation();
    this.setState((prevState) => ({
      ownBtnState: prevState.ownBtnState.map((i, index) => currentIndex === index ? !i: i)
    }))
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
      // if data is array, call ArrayCo
      // mponent
      else if (Array.isArray(data[key])) {
        const index = counter - 1
        const arrayComp = (
          <ArrayComponent
            data={data[key]}
            nested={true}
            commar={counter !== dataLength ? true : false}
            componentIndex={index}
            hoistState={this.updateChildButtonsState}
            savedState={this.state.childBtnState.length >= 0 && this.state.childBtnState}
          />
        )
        const returnElem = (
          <div key={shortid.generate()} style={{marginLeft: '15px'}}>
            <span>{`${key}: [`}</span>
              <span>
                {this.state.ownBtnState[index] &&
                  <span style={{float:'right'}} onClick={(e) => this.expandButton(e, index)}> {'<'} </span>}
              </span>
              <span>
                {this.state.ownBtnState[index]
                  ? arrayComp
                  : <span onClick={(e) => this.expandButton(e, index)}>{'...]'}</span>}
              </span>
          </div>
        )
        elem.push(returnElem)
      }
      // if data is object, call ObjectComponent recursively
      else if (Object.prototype.toString.call(data[key]) === "[object Object]") {
        const index = counter - 1
        const objectComp = (
          <ObjectComponent
            data={data[key]}
            nested={true}
            commar={counter !== dataLength ? true : false}
            componentIndex={index}
            hoistState={this.updateChildButtonsState}
            savedState={this.state.childBtnState.length >= 0 && this.state.childBtnState[index]}
          />
        )
        const returnElem = (
          <div key={shortid.generate()} style={{marginLeft: '15px'}}>
            <span>{`${key}: {`}</span>
            <span>
              {this.state.ownBtnState[index] &&
                <span style={{float:'right'}} onClick={(e) => this.expandButton(e, index)}> {'<'} </span>}
            </span>
            <span>
              {this.state.ownBtnState[index]
                ? objectComp
                : <span onClick={(e) => this.expandButton(e, index)}>{counter !== dataLength ? '...},' : '...}'}</span>}
            </span>
          </div>
        )
        elem.push(returnElem)
      }
      // otherwise, returns undefined
      else {
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
        { this.props.commar ? '},' : '}'}
      </div>
    );
  }
}


ObjectComponent.propTypes = {
  data: PropTypes.object.isRequired
};

export default ObjectComponent;
