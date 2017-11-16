import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid'
import ArrayComponent from '../JsonComponent/ArrayComponent';
import './JsonComponent.css'

class ObjectComponent extends Component {
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
    const elem = [];
    const dataLength = Object.keys(data).length;

    let counter = 0;
    // loop through each key in object
    for (const key in data) {
      counter++
      // if data is number/string/boolean, return normal {key: number/string}
      if (typeof data[key] === 'string' || typeof data[key] === 'number' || typeof data[key] === 'boolean') {
        const value = typeof data[key] === 'string' && (data[key].includes('http') || data[key].includes('www.'))
          ? <a className='link' href={data[key]} target="_blank">{data[key]}</a>
          : <span className='value'>{`${data[key]}`}</span>
        elem.push(
          <div key={shortid.generate()} className='key-value'>
            <span className='key'>{`${key.toUpperCase()}`}</span>
            <span className='syntax'>{`: '`}</span>
            {value}
            <span className='syntax'>{`${counter !== dataLength ? "'," : "'"}`}</span>
          </div>
        )
      }
      // if data is array, call ArrayComponent
      else if (Array.isArray(data[key])) {
        const index = counter - 1
        const arrayComp = (
          <ArrayComponent
            data={data[key]}
            nested={true}
            expandAll={this.state.expandAll}
            commar={counter !== dataLength ? true : false}
            componentIndex={index}
            hoistState={this.updateChildButtonsState}
            savedState={this.state.childBtnState.length >= 0 && this.state.childBtnState[index]}
          />
        )
        const returnElem = (
          <div key={shortid.generate()}  className='key-value'>
            <span className='key'>{`${key.toUpperCase()}`}</span>
            <span className='syntax'>{`: [`}</span>
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
                : <button className='expand-btn' onClick={(e) => this.expandButton(e, index)}>{counter !== dataLength ? '...],' : '...]'}</button>}
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
            expandAll={this.state.expandAll}
            commar={counter !== dataLength ? true : false}
            componentIndex={index}
            hoistState={this.updateChildButtonsState}
            savedState={this.state.childBtnState.length >= 0 && this.state.childBtnState[index]}
          />
        )
        const returnElem = (
          <div key={shortid.generate()}  className='key-value'>
            <span className='key'>{`${key.toUpperCase()}`}</span>
            <span className='syntax'>{`: {`}</span>
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
                : <button className='expand-btn' onClick={(e) => this.expandButton(e, index)}>{counter !== dataLength ? '...},' : '...}'}</button>}
            </span>
          </div>
        )
        elem.push(returnElem)
      }
      // otherwise, returns undefined
      else {
        elem.push(
          <div key={shortid.generate()}  className='key-value'>
            <span className='key'>{`${key.toUpperCase()}`}</span>
            <span className='syntax'>{`:`}</span>
            <span>{` undefined${counter !== dataLength ? ',' : ''}`}</span>
          </div>
        )
      }
    }

    return (
      <div className={ this.props.nested ? 'object-compo' : 'top-parent'}>
        <p className='syntax'>{ this.props.nested ? '' : '{'}</p>
          {elem}
        <p className='syntax' style={{marginBottom: '10px'}}>{ this.props.commar ? '},' : '}'}</p>
      </div>
    );
  }
}


ObjectComponent.propTypes = {
  data: PropTypes.object.isRequired
};

export default ObjectComponent;
