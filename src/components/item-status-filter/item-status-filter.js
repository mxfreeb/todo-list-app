import React, { Component } from 'react';

import './item-status-filter.css';


export default class ItemStatusFilter extends Component {

  buttons = [
      { name: 'all', label: 'ВСЕ' },
      { name: 'active', label: 'Не выполнены' },
      { name: 'done', label: 'Выполнены' }
  ];

  render() {

    const { filter, onFilterChange, onRemoveDone, allCount   } = this.props;

    const buttons = this.buttons.map( ( {name, label} ) => {

        const isActive = filter === name;

        const clazz = isActive ? 'active' : '';

        return (
            <button type="button"
                    className={`st-btn ${clazz}`}
                    key={name}
                    onClick={ () => onFilterChange(name)  }>
                {label}
            </button>
        );
    });

    return (
        <div className="filters-box d-flex">
            <div
                className="cont-items">
                Всего {allCount}
            </div>
            <div className="btns-group">
              { buttons }
            </div>
            <div className="remove-box">
                <span onClick={ () => onRemoveDone() }>Удалить выполненые</span>
            </div>
        </div>
    );
  }
}
