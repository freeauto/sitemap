import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import connect from 'utils/do-connect.jsx'
import { ListDo } from './do/ListDo.jsx'
import { WorkButton } from 'front/button.jsx'

export class ListView extends React.Component {
    onSubmitUrl_(e) {
        e.preventDefault();
        const {listDo} = this.props
        const _this = this;
        if (this.refs.url.value)
            listDo.scrapeSite(this.refs.url.value, () => {
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
                            <th>Site</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {siteKeys.map(siteKey =>
                                <tr key={siteKey}><td>{siteKey}</td><td>View</td></tr>
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
                <div>
                    <form className="form-inline" onSubmit={this.onSubmitUrl_}>
                        <div className="form-group">
                            <label>URL:&nbsp;</label>
                            <input ref="url" type="text" className="form-control" placeholder="Ex: openai.com" />
                        </div>{' '}
                        <WorkButton type="submit" className="btn btn-primary"><i className="fa fa-plus" /> Start Scraping</WorkButton>
                    </form>
                </div>
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
