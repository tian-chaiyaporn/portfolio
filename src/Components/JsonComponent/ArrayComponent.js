import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid'
import ObjectComponent from '../JsonComponent/ObjectComponent';
import './JsonComponent.css'

class ArrayComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      childBtnState: this.props.savedState && this.props.savedState.childState ? this.props.savedState.childState : [],
      ownBtnState: this.props.savedState && this.props.savedState.ownState
        ? this.props.savedState.ownState.map(s => s)
        : Object.keys(this.props.data).map(k => this.props.expandAll),
      componentIndex: this.props.componentIndex ? this.props.componentIndex : 0,
      expandAll: this.props.expandAll
    }
    this.expandButton = this.expandButton.bind(this)
    this.updateChildButtonsState = this.updateChildButtonsState.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    nextProps.expandAll && this.setState({
      ownBtnState: Object.keys(this.props.data).map(k => nextProps.expandAll),
      expandAll: nextProps.expandAll,
      childBtnState: []
    })
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
        const value = typeof element && element.includes('.com') && (element.includes('http') || element.includes('www.'))
          ? <a className='link' href={element}>{element}</a>
          : <span className='value'>{`'${element}'`}</span>
        return (
          <div key={shortid.generate()} style={{marginLeft: '5px', display: 'inline-block'}}>
            {value}<span className='syntax'>{`${index + 1 !== dataLength ? ',' : ''}`}</span>
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
            expandAll={this.state.expandAll}
            commar={index + 1 !== dataLength ? true : false}
            componentIndex={index}
            hoistState={this.updateChildButtonsState}
            savedState={this.state.childBtnState.length >= 0 && this.state.childBtnState[index]}
          />
        )
        return (
          <div key={shortid.generate()} className='key-value'>
            <span className='syntax'>{`{`}</span>
            <span>
              {
                <button
                  className={`expand-arrow ${this.state.ownBtnState[index] && 'rotate-arrow'}`}
                  onClick={(e) => this.expandButton(e, index)}>
                    {'>'}
                </button>
              }
            </span>
            <span>
              {this.state.ownBtnState[index]
                ? objectComp
                : <button className='expand-btn' onClick={(e) => this.expandButton(e, index)}>{index + 1 !== dataLength ? '...},' : '...}'}</button>}
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
            expandAll={this.state.expandAll}
            commar={index + 1 !== dataLength ? true : false}
            componentIndex={index}
            hoistState={this.updateChildButtonsState}
            savedState={this.state.childBtnState.length >= 0 && this.state.childBtnState[index]}
          />
        )
        return (
          <div key={shortid.generate()} className='key-value'>
            <span className='syntax'>{'['}</span>
            <span>
              {
                <button
                  className={`expand-arrow ${this.state.ownBtnState[index] && 'rotate-arrow'}`}
                  onClick={(e) => this.expandButton(e, index)}>
                    {'>'}
                </button>
              }
            </span>
            <span>
              {this.state.ownBtnState[index]
                ? arrayComp
                : <button className='expand-btn' onClick={(e) => this.expandButton(e, index)}>{index + 1 !== dataLength ? '...],' : '...]'}</button>}
            </span>
          </div>
        )
      }
      // otherwise, returns undefined
      else {
        return (
          <div key={shortid.generate()} style={{marginLeft: '5px'}}>
            <span className='syntax'>{`undefined${index + 1 !== data.length ? ',' : ''}`}</span>
          </div>
        )
      }
    })

    return (
      <div className="ArrayComponent" style={{ display: !detectObject && 'inline', marginBottom: '10px'}}>
        <span className='syntax'>{ this.props.nested ? '' : '['}</span>
          { detectObject ? <p></p> : ''}
            {finalElem}
          { detectObject ? <p></p> : ''}
        <span className='syntax'>{ this.props.commar ? '],' : ']'}</span>
      </div>
    );
  }
}


ArrayComponent.propTypes = {
  data: PropTypes.array.isRequired
};

export default ArrayComponent;
