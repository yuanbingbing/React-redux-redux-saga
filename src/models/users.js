import * as usersService from '../services/users';

export default {
  namespace: 'users',
  state: {
  	list: [],
  	total: null,
  	page: null,
  },
  // 同步的reducers执行函数
  reducers: {
  	save(state, {payload:{data: list, total,page}}) {
  	  return {...state, list, total, page}
  	}
  },
  // 异步执行的方法
  effects: {
    *fetch({payload:{page = 1}}, {call, put}) {
    	// 调用获取数据的方法，并且获取到data,headers
    	const {data, headers} = yield call(usersService.fetch, {page});
    	yield put({
    	  type: 'save',
    	  payload:{
    	  	data,
    	  	total:  parseInt(headers['x-total-count']),
    	  	page: parseInt(page)
    	  }
    	})
    },
    // 定义删除内容的方法
    *remove({payload: id},{call,put,select}) {
      yield call(usersService.remove,id)
      const page = yield select(state => state.users.page)
      yield put({type: 'fetch',payload: {page}})
    }
  },
  // 监测数据订阅的方法
  subscriptions: {
  	setup({dispatch,history}) {
  	  return history.listen(({pathname, query}) => {
  	    if (pathname === '/users') {
  	      dispatch({type: 'fetch', payload: query})
  	    }
  	  })
  	}
  },
};
