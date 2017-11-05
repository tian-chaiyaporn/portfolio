import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid'
import ObjectComponent from '../JsonComponent/ObjectComponent';

class ArrayComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      childBtnState: this.props.savedState && this.props.savedState.childState ? this.props.savedState.childState : [],
      ownBtnState: this.props.savedState && this.props.savedState.ownState
        ? this.props.savedState.ownState.map(s => s)
        : Object.keys(this.props.data).map(k => false),
      componentIndex: this.props.componentIndex ? this.props.componentIndex : 0
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
    const dataLength = data.length
    let detectObject = false

    // loop through each element in array
    const finalElem = data.map((element, index) => {
      // if string/number/boolean, represent as such
      if (typeof element === 'string' || typeof element === 'number' || typeof element === 'boolean') {
        return (
          <div key={shortid.generate()} style={{marginLeft: '5px', display: 'inline'}}>
            <span>{`${element}${index + 1 !== dataLength ? ',' : ''}`}</span>
          </div>
        )
      }
      // if array, call itself recursively data
      else if (Object.prototype.toString.call(element) === "[object Object]") {
        detectObject = true
        const objectComp = (
          <ObjectComponent
            data={element}
            nested={true}
            commar={index + 1 !== dataLength ? true : false}
            componentIndex={index}
            hoistState={this.updateChildButtonsState}
            savedState={this.state.childBtnState.length >= 0 && this.state.childBtnState[index]}
          />
        )
        return (
          <div key={shortid.generate()} style={{marginLeft: '15px'}}>
            <span>{`{`}</span>
            <span>
              {this.state.ownBtnState[index] &&
                <span style={{float:'right'}} onClick={(e) => this.expandButton(e, index)}> {'<'} </span>}
            </span>
            <span>
              {this.state.ownBtnState[index]
                ? objectComp
                : <span onClick={(e) => this.expandButton(e, index)}>{index + 1 !== dataLength ? '...},' : '...}'}</span>}
            </span>
          </div>
        )
      }
      // if object, call object and pass data
      else if (Array.isArray(element)) {
        detectObject = true
        const arrayComp = (
          <ArrayComponent
            data={element}
            nested={true}
            commar={index + 1 !== dataLength ? true : false}
            componentIndex={index}
            hoistState={this.updateChildButtonsState}
            savedState={this.state.childBtnState.length >= 0 && this.state.childBtnState[index]}
          />
        )
        return (
          <div key={shortid.generate()} style={{marginLeft: '15px'}}>
            <span>{'['}</span>
            <span>
              {this.state.ownBtnState[index] &&
                <span style={{float:'right'}} onClick={(e) => this.expandButton(e, index)}> {'<'} </span>}
            </span>
            <span>
              {this.state.ownBtnState[index]
                ? arrayComp
                : <span onClick={(e) => this.expandButton(e, index)}>{index + 1 !== dataLength ? '...],' : '...]'}</span>}
            </span>
          </div>
        )
      }
      // otherwise, returns undefined
      else {
        return (
          <div key={shortid.generate()} style={{marginLeft: '5px'}}>
            <span>{`undefined${index + 1 !== data.length ? ',' : ''}`}</span>
          </div>
        )
      }
    })

    return (
      <div className="ArrayComponent" style={{ display: !detectObject && 'inline'}}>
        { this.props.nested ? '' : '['}
          {finalElem}
        { this.props.commar ? '],' : ']'}
      </div>
    );
  }
}


ArrayComponent.propTypes = {
  data: PropTypes.array.isRequired
};

export default ArrayComponent;
