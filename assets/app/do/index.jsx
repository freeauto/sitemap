import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { ListDo } from './ListDo.jsx'

export const RootDo = {
    list: ListDo
}

const reducerMap = {
    routing: routerReducer // expected to be called 'routing'
}

for (let key in RootDo) {
    reducerMap[key] = RootDo[key].reducer
}

export const RootReducer = combineReducers(reducerMap)
