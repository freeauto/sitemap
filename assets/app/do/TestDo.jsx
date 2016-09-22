import { routerActions } from 'react-router-redux'

import { getError, prefixValues } from 'utils/render-utils.jsx'
import { LoadMixin } from 'mixins/LoadMixin.jsx'


class Do {
    static kind = 'test'
    static getUrl = '/api/tests'

    constructor(dispatch, getState) {
        this.dispatch = dispatch
        this.getState = getState
    }
}


Do.initialState = {
    request: {
        page: 0
    },

    tests: []
}


Do.reducer = function(state=Do.initialState, action=null) {
    state = Do.loadReducer(state, action)
    switch (action.type) {
        case Do.LOAD_DONE:
        {
            const data = action.data;
            return Object.assign({}, state, {
                tests: data.tests
            })
        }
    }
    return state
}


Do = LoadMixin(Do)

export { Do as TestDo }
