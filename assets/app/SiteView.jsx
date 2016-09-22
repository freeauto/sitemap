import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import connect from 'utils/do-connect.jsx'
import { SiteDo } from './do/SiteDo.jsx'
import { ListDo } from './do/ListDo.jsx'
import { Paginate } from './widget.jsx'


export class PageItem extends React.Component {
    render() {
        const {page} = this.props
        const title = (page.data && page.data.title) || page.url
        const numUrls = (page.data && page.data.urls && page.data.urls.length)
        return (
            <tr>
                <td><a href={page.url}>{title}</a></td>
                <td>{numUrls}</td>
                <td>{page.created_at}</td>
            </tr>
        )
    }
}


export class SiteView extends React.Component {
    componentDidMount() {
        this.props.siteDo.refresh_()
    }

    render() {
        const { listSt, listDo, siteSt, siteDo } = this.props
        const { siteMap } = listSt
        const siteKey = this.props.params.siteKey
        const site = siteMap && siteMap[siteKey]
        const { pages, total, page, pageSize } = this.props.siteSt
        const num = pages.length
        if (!site)
            return (
                <h1>Loading...</h1>
            )
        return (
            <div>
                <h1>Pages found on {site.domain}</h1>
                    <div className="alert alert-info">
                    <b>Scraper live status:</b> {site.progress}
                    </div>
                <Paginate className="pad-top-bottom" page={page} pageSize={pageSize} num={num} total={total}
                    onClickPrev={siteDo.prevPage_} onClickNext={siteDo.nextPage_} units="pages scraped">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Page</th>
                                <th>Num pages</th>
                                <th>Found at</th>
                            </tr>
                        </thead>
                        <tbody>
                            { pages.map(page =>
                                    <PageItem key={page.key} page={page} />
                            ) }
                        </tbody>
                    </table>
                </Paginate>
            </div>
        )
    }

    static propTypes = {
        siteSt: PropTypes.object.isRequired,
        siteDo: PropTypes.object.isRequired,
        listSt: PropTypes.object.isRequired,
        listDo: PropTypes.object.isRequired
    }
}


SiteView = connect({
    site: SiteDo,
    list: ListDo
})(SiteView)
