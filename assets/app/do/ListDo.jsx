import { routerActions } from 'react-router-redux'

import { getError, prefixValues } from 'utils/render-utils.jsx'
import { LoadMixin } from 'mixins/LoadMixin.jsx'


class Do {
    static kind = 'list'
    static getUrl = '/api/sites'

    constructor(dispatch, getState) {
        this.dispatch = dispatch
        this.getState = getState
    }

    createList(url, callback) {
        const _this = this
        $.post('/api/sites', {url}, data => {
            console.log("Posted site", data);
            _this.dispatch({
                type: Do.CREATE_DONE,
                data
            })
            if (callback)
                callback(data)
        }).fail((xhr, status, error) => {
            console.error("Failed", getError(xhr, status, error));
        });
    }
}

Object.assign(Do, prefixValues(Do.kind, {
    CREATE_DONE: 'CREATE_DONE'
}))

Do.initialState = {
    request: {
        page: 0
    },

    siteKeys: [],
    siteMap: {}
}


Do.reducer = function(state=Do.initialState, action=null) {
    state = Do.loadReducer(state, action)
    switch (action.type) {
        case Do.LOAD_DONE:
        {
            const data = action.data;
            return Object.assign({}, state, {
                sites: data.sites
            })

            const { sites } = action.data
            let siteMap = {}, siteKeys = []
            for (const site of sites) {
                siteMap[site.key] = site
                siteKeys.push(site.key)
            }
            return Object.assign({}, state, {
                siteKeys,
                siteMap
            })
        }
        case Do.CREATE_DONE:
        {
            const {site} = action.data
            state.siteKeys.unshift(site.key)
            state.siteMap[site.key] = site
            return Object.assign({}, state)
        }
    }
    return state
}


Do = LoadMixin(Do)

export { Do as ListDo }
