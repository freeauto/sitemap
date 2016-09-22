import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import connect from 'utils/do-connect.jsx'
import { ListDo } from './do/ListDo.jsx'
import { WorkButton } from 'front/button.jsx'

export class ListRow extends React.Component {
    render() {
        const {site} = this.props
        return (
            <tr><td>{site.key}</td>
                <td>{site.created_at}</td><td>{site.domain}</td>
                <td>{site.progress ? <span><i className="fa fa-spinner fa-spin"></i> {site.progress}</span> : "DONE"}</td>
                <td><Link to={'/site/' + site.key} className="btn btn-default">View</Link></td>
            </tr>
        )
    }
}

export class ListView extends React.Component {
    constructor() {
        super()
        this.onSubmitUrl_ = this.onSubmitUrl_.bind(this)
    }

    onSubmitUrl_(e) {
        e.preventDefault();
        const {listDo} = this.props
        const _this = this;
        listDo.createSite(this.refs.url.value, () => {
            _this.refs.url.value = '';
        });
    }

    renderContent() {
        const { siteKeys, siteMap, loading } = this.props.listSt;

        if (loading)
            return (
                <h1>Loading...</h1>
            )

        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Scrape ID</th>
                            <th>Started at</th>
                            <th>Domain</th>
                            <th>Live Status</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {siteKeys.map(siteKey =>
                          <ListRow key={siteKey} site={siteMap[siteKey]} />
                        )}
                    </tbody>
                </table>
            </div>
        )
    }

    render() {
        const { status } = this.props.listSt
        return (
            <div>
                <h1>My Sites</h1>
                <div>
                    <form className="form-inline" onSubmit={this.onSubmitUrl_}>
                        <div className="form-group">
                            <label>URL:&nbsp;</label>
                            <input ref="url" type="text" className="form-control" placeholder="Ex: openai.com" />
                        </div>{' '}
                        <WorkButton type="submit" className="btn btn-primary"><i className="fa fa-plus" /> Start Scraping</WorkButton>
                    </form>
                </div>
                { status ? <div className="alert alert-warning">{status}</div> : null }
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
