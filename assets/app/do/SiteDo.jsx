import { routerActions } from 'react-router-redux'

import { getError, urlParams, dictSubset, prefixValues } from 'utils/render-utils.jsx'
import { LoadMixin } from 'mixins/LoadMixin.jsx'

class Do {
    static kind = 'site'
    static getUrl = '/api/pages'

    constructor(dispatch, getState) {
        this.dispatch = dispatch
        this.getState = getState
    }

    updateDo(props) {
        this.params = props.params
    }

    getRequest() {
        return {
            page: parseInt(this.location.query.page || '1'),
            site: this.params.siteKey
        }
    }
}

Do.initialState = {
    request: {
        site: null,
        page: 0
    },
    pages: []
}

Do.reducer = function(state=Do.initialState, action=null) {
    state = Do.loadReducer(state, action)
    switch (action.type) {
        case Do.LOAD_DONE:
        {
            const data = action.data;
            return Object.assign({}, state, {
                pages: data.pages
            })
        }
    }
    return state
}

Do = LoadMixin(Do)

export { Do as SiteDo }
