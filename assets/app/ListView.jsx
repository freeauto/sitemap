import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import connect from 'utils/do-connect.jsx'
import { ListDo } from './do/ListDo.jsx'

export class ListView extends React.Component {
    renderContent() {
        const { sites, loading } = this.props.listSt;

        if (loading)
            return (
                <h1>Loading...</h1>
            )

        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Site</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sites.map(site =>
                                <tr key={site}><td>{site}</td><td>View</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }

    render() {
        const { error } = this.props.listSt
        return (
            <div>
                <h1>My Sites</h1>
                { error ? <div className="alert alert-danger">Uh oh! { error }</div> : null }
                {this.renderContent()}
            </div>
        )
    }

    static propTypes = {
        listSt: PropTypes.object.isRequired,
        listDo: PropTypes.object.isRequired
    }
}

ListView = connect({
    list: ListDo
})(ListView)
