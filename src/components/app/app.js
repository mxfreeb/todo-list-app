import React, { Component } from 'react';

import AppHeader from '../app-header';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
        this.createTodoItem('Сверстать макет'),
        this.createTodoItem('Сделать функции добавления, удаления, выполнения'),
        this.createTodoItem('Сделать функцию фильтрации по статусу')
    ],
    filter: 'all'
  };

  createTodoItem(label) {
    return {
      label,
      done: false,
      id: this.maxId++
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArray
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArr = [
        ...todoData,
        newItem
      ];

      return {
        todoData: newArr
      };
    });
  };

  onRemoveDone = () => {
    this.setState(({ todoData }) => {
      const oldArray = todoData;
      const newArray = oldArray.filter((el) => el.done === false)

      return {
        todoData: newArray
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];
  };

  onToggleDone = (id) => {
    this.setState( ({ todoData }) => {
      return {
        todoData: this.toggleProperty( todoData, id, 'done' )
      };
    });

  };

  filterItems(items, filter) {
    if (filter === 'all') {
      return items;
    } else if (filter === 'active') {
      return items.filter((item) => (!item.done));
    } else if (filter === 'done') {
      return items.filter((item) => item.done);
    }
  }

  onFilterChange = (filter) => {
    this.setState({ filter  });
  };



  render() {

    const { todoData, filter } = this.state;

    const visibleItems = this.filterItems(todoData, filter);

    const allCount = todoData.length;

    return (
      <div className="todo-app">
        <AppHeader />
        <ItemAddForm onItemAdded={this.addItem}/>


        <TodoList todos={visibleItems}
          onDeleted={ this.deleteItem }
          onToggleDone={ this.onToggleDone }/>

        <div className="top-panel d-flex">
          <ItemStatusFilter
              filter={filter}
              onFilterChange={ this.onFilterChange }
              allCount={allCount}
              onRemoveDone={ this.onRemoveDone }/>
        </div>


      </div>
    );
  }
};
