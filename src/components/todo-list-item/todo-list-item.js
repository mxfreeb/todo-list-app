import React, { Component } from 'react';

import './todo-list-item.css';

export default class TodoListItem extends Component {

  render() {
    const { label, onToggleDone, done } = this.props;

    let classNames = 'todo-list-item d-flex';
    if (done) {
      classNames += ' done';
    }

    return (
      <span className={classNames}>
        <span className="check-box"><span></span></span>
        <span
          className="todo-list-item-label"
          onClick={ onToggleDone }>
          {label}
        </span>
      </span>
    );
  };
}

