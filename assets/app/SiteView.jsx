import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import connect from 'utils/do-connect.jsx'
import { SiteDo } from './do/SiteDo.jsx'

export class SiteView extends React.Component {
    componentDidMount() {
        const { params } = this.props
        this.props.siteDo.load(params.siteKey)
    }

    renderContent(site) {
        console.log("SITE", site)
        return (
            <div>
                <h1>Site ID {site.key} - {site.domain}</h1>
            </div>
        )
    }

    render() {
        const { siteDo, siteSt } = this.props
        const { site, status } = siteSt
        return (
            <div>
                { status ? <div className="alert alert-warning">{status}</div> : null }
                { site && this.renderContent(site) }
            </div>
        )
    }

    static propTypes = {
        siteSt: PropTypes.object.isRequired,
        siteDo: PropTypes.object.isRequired
    }
}


SiteView = connect({
    site: SiteDo
})(SiteView)
