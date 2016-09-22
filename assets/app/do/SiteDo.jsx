import { routerActions } from 'react-router-redux'

import { getError, urlParams, dictSubset, prefixValues } from 'utils/render-utils.jsx'


class Do {
    static kind = 'site'

    constructor(dispatch, getState) {
        this.dispatch = dispatch
        this.getState = getState
    }

    load(key) {
        const _this = this
        _this.dispatch({
            type: Do.LOAD_STATUS,
            status: 'Loading...'
        });
        $.get('/api/sites/' + key, data => {
            _this.dispatch({
                type: Do.LOAD_DONE,
                data: data
            });
        }).fail((xhr, status, error) => {
            console.error("Failed", getError(xhr, status, error));
            _this.dispatch({
                type: Do.LOAD_STATUS,
                status: getError(xhr, status, error)
            });
        })
    }
}

Object.assign(Do, prefixValues(Do.kind, {
    LOAD_DONE: 'LOAD_DONE',
    LOAD_STATUS: 'LOAD_STATUS'
}))

Do.initialState = {
    site: null,
    status: null
}

Do.reducer = function(state=Do.initialState, action=null) {
    switch (action.type) {
        case Do.LOAD_DONE:
        {
            const { data } = action;
            return Object.assign({}, state, {
                status: null,
                site: data.site
            });
        }
        case Do.LOAD_STATUS:
            return Object.assign({}, state, {
                status: action.status
            });
    }
    return state
}


export { Do as SiteDo }
