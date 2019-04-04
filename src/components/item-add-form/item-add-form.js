import React, { Component } from 'react';

import './item-add-form.css';

export default class ItemAddForm extends Component {

  state = {
      label: ''
  };

  onLabelChange = (e) => {
      this.setState({
          label: e.target.value
      })
  };

  onSubmit = (e) => {
      e.preventDefault();
      this.props.onItemAdded(this.state.label);
      this.setState({
          label: ''
      });
  }

  render() {
    return (
      <form className="item-add-form d-flex" onSubmit={this.onSubmit}>
        <input
            type="text"
            className="item-add-form__input"
            onChange={this.onLabelChange}
            placeholder="Что мне нужно сделать?"
            value={this.state.label}
        />
        <button
          className="item-add-form__button"
        >
          +
        </button>
      </form>
    )
  }
}
