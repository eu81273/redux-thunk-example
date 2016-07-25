import * as types from './types'

//액션 생성자
//액션은 무언가 일어난다는 사실을 기술한다.
//redux 에서 부작용을 제거하기 위해 액션 생성자는 액션을 만드는 함수로 순수 함수로 구성된다.
//하지만 redux-thunk 으로 생성하는 thunk function 의 경우 순수할 필요가 없다.
//https://github.com/reactjs/redux/issues/533
export function addTodo (text) {
	return {
		type: types.action.ADD_TODO,
		text
	};
};

export function insertTodos (todos) {
	return {
		type: types.action.ADD_TODOS,
		todos
	};
};

export function addTodos () {
	//redux-thunk 미들웨어는 리턴되는 값이 객체가 아니라 함수인 경우, dispatch 를 주입해서 실행하게 된다.
	return function (dispatch) {
		//먼저 fetching 을 시작했다는 액션을 dispatch 한다.
		//이때 추가적인 비동기 작업이 진행되지 않도록 상태값이 변경된다.
		dispatch(fetching());

		setTimeout(() => {
			fetch('/todo.json')
			.then(response => response.json())
			//가져온 todos 를 추가하는 액션을 dispatch 한다.
			.then(result => dispatch(insertTodos(result)))
			//완료되면 complete 되었다는 액션을 dispatch 한다.
			//이제 다시 비동기 작업을 수행할 수 있게 된다.
			.then(() => dispatch(complete()));
		}, 5000);
	}
};

export function fetching () {
	return {
		type: types.status.FETCHING
	};
};

export function complete () {
	return {
		type: types.status.COMPLETE
	};
};

export function completeTodo (index) {
	return {
		type: types.action.COMPLETE_TODO,
		index
	};
};

export function setFilter (filter) {
	return {
		type: types.action.SET_VISIBILITY_FILTER,
		filter
	};
}
