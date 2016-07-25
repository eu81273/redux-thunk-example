import React, { Component, PropTypes } from 'react';
import * as actionCreator from '../actionCreator';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import Footer from '../components/Footer';

export default class App extends Component {
	constructor (props) {
		super(props);
	}

	render () {
		//redux로부터 주입받는 속성
		const { dispatch, todos, filter, status } = this.props;

		return (
			<div>
				<AddTodo
					//자식 요소에 핸들러 전달
					onAddClick={text => dispatch(actionCreator.addTodo(text))}
				/>

				<TodoList
					//자식 요소에 todos 배열 전달
					todos={todos}
					//자식 요소에 핸들러 전달
					onTodoClick={index => dispatch(actionCreator.completeTodo(index))}
				/>

				<Footer
					//자식 요소에 filter 전달
					filter={filter}
					status={status}
					//자식 요소에 핸들러 전달
					onFilterChange={selectedFilter => dispatch(actionCreator.setFilter(selectedFilter))}
					onFetchTodosClick={() => dispatch(actionCreator.addTodos())}
				/>
			</div>
		);
	}
};

/*
App.propTypes = {
	todos: PropTypes.arrayOf(PropTypes.shape({
		text: PropTypes.string.isRequired,
		completed: PropTypes.bool.isRequired
	})),
	filter: PropTypes.oneOf([
		'SHOW_ALL',
		'SHOW_COMPLETED',
		'SHOW_ACTIVE'
	]).isRequired
};
*/
