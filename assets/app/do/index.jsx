import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { TestDo } from './TestDo.jsx'

export const RootDo = {
    test: TestDo
}

const reducerMap = {
    routing: routerReducer // expected to be called 'routing'
}

for (let key in RootDo) {
    reducerMap[key] = RootDo[key].reducer
}

export const RootReducer = combineReducers(reducerMap)
