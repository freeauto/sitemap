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

    createSite(url, callback) {
        const _this = this
        $.post('/api/sites', {url}, data => {
            console.log("Posted site", data);
            _this.dispatch({
                type: Do.UPDATE_SITE,
                data
            })
            if (callback)
                callback(data)
        }).fail((xhr, status, error) => {
            console.error("Failed", getError(xhr, status, error));
            _this.dispatch({
                type: Do.LOAD_STATUS,
                status: getError(xhr, status, error)
            });
        });
    }

    updateSite(site) {
        this.dispatch({
            type: Do.UPDATE_SITE,
            data: {site: site}
        })
    }
}

Object.assign(Do, prefixValues(Do.kind, {
    UPDATE_SITE: 'UPDATE_SITE',
    LOAD_STATUS: 'LOAD_STATUS'
}))

Do.initialState = {
    request: {
        page: 0
    },

    siteKeys: [],
    siteMap: {},
    status: null
}


Do.reducer = function(state=Do.initialState, action=null) {
    state = Do.loadReducer(state, action)
    switch (action.type) {
        case Do.LOAD_DONE:
        {
            const { sites } = action.data
            let siteMap = {}, siteKeys = []
            for (const site of sites) {
                siteMap[site.key] = site
                siteKeys.push(site.key)
            }
            return Object.assign({}, state, {
                status: null,
                siteKeys,
                siteMap
            })
        }
        case Do.LOAD_STATUS:
            return Object.assign({}, state, {
                status: action.status
            });
        case Do.UPDATE_SITE:
        {
            const {site} = action.data
            if (!state.siteMap[site.key])
                state.siteKeys.unshift(site.key)
            state.siteMap[site.key] = site
            return Object.assign({}, state, {
                status: null
            })
        }
    }
    return state
}


Do = LoadMixin(Do)

export { Do as ListDo }
