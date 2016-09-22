import 'babel-core/polyfill'; // for IE compatibility

import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, useRouterHistory, Link } from 'react-router'
import { createHistory } from 'history'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
//import thunkMiddleware from 'redux-thunk'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'

import connect from 'utils/do-connect.jsx'
import { ListView } from './ListView.jsx'
import { RootDo, RootReducer } from './do/index.jsx'
import { IN_BROWSER, IS_LIKE_PROD } from 'front/constants.jsx'
import { NavLink } from 'front/nav.jsx'


// store logic

let middleWare = [] //thunkMiddleware];
if (IN_BROWSER) {
    var browserHistory = useRouterHistory(createHistory)({
        basename: '/app'
    });
    middleWare.push(routerMiddleware(browserHistory))
    if (!IS_LIKE_PROD) {
        var createLogger = require('redux-logger');
        middleWare.push(createLogger());
    }
}
const _createStoreWithMiddleware = applyMiddleware(...middleWare)(createStore)
function myCreateStore() {
    const store = _createStoreWithMiddleware(RootReducer);
    if (module.hot) { // hot reloading for reducer
        module.hot.accept('./do', () => {
            store.replaceReducer(require('./do'))
        })
    }
    return store;
}

// server data (exported function for render-server to call; can do store.dispatch({action}))

function onServerInit(store, data) {
    global.SERVER_DATA = data
    global.ROOT_DO = {}
    for (let key in RootDo) {
        ROOT_DO[key] = new RootDo[key](store.dispatch, () => store.getState()[key])
    }
}

function onServerCleanup() {
}

class NavView extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-custom" role="navigation">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle notify-anchor" data-toggle="collapse" data-target=".navbar-main-collapse">
                            <i className="fa fa-bars" />
                        </button>
                        <Link to="/" className="navbar-brand"><i className="fa fa-code-fork"></i> Sitemap</Link>
                    </div>
                </div>
            </nav>
        )
    }

    static propTypes = {
    }
}

NavView = connect({}, ['routing'])(NavView)

// app

class AppView extends React.Component {
    static childContextTypes = {
        location: PropTypes.object
    }

    getChildContext() {
        return { location: this.props.location };
    }

    render() {
        return (
            <div>
                <NavView />
                <section className="container">
                    {this.props.children}
                </section>
                <footer>
                    <div className="container text-center">
                        <p><a href="mailto:richard@baylaunch.com" className="text-muted" target="_blank">richard@baylaunch.com</a></p>
                    </div>
                </footer>
            </div>
        );
    }
}

// routes

let AppRouter = (
    <Route path="/" component={AppView}>
        <IndexRoute component={ListView} />
        <Route path="team" component={ListView} />
    </Route>
);

// go!

if (IN_BROWSER) {
    const store = myCreateStore();
    const history = syncHistoryWithStore(browserHistory, store);
    onServerInit(store, window.__SERVER_DATA);

    ReactDOM.render((
        <Provider store={store}>
            <Router history={history}>{AppRouter}</Router>
        </Provider>
    ), document.getElementById('react-root'));
}

export { myCreateStore as myCreateStore, AppRouter as routes }
export { myCreateStore, onServerInit, onServerCleanup }
