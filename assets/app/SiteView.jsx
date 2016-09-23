import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import connect from 'utils/do-connect.jsx'
import { SiteDo } from './do/SiteDo.jsx'
import { ListDo } from './do/ListDo.jsx'
import { Paginate } from './widget.jsx'


export class PageItem extends React.Component {
    constructor() {
        super();
        this.expand_ = this.expand_.bind(this)
    }

    expand_() {
        console.log("HELLO", this.props.page);
        this.props.siteDo.expand(this.props.page)
    }

    render() {
        const {page} = this.props
        const title = (page.data && page.data.title) || page.url
        const numUrls = (page.data && page.data.urls && page.data.urls.length)
        if (page.expanded && numUrls)
            return (
                <tr>
                    <td colSpan="3">
                        {numUrls} links found at <a href={page.url}>{title}</a>:
                        <ul>
                        {page.data.urls.map(url =>
                            <li><a href={url}>{url}</a></li>
                        )}
                        </ul>
                        Assets:
                        <ul>
                            {page.data.assets.map(url =>
                            <li><a href={url}>{url}</a></li>
                            )}
                        </ul>
                    </td>
                </tr>
            )

        const _this = this;

        return (
            <tr>
                <td><a href={page.url}>{title}</a></td>
                <td>{(numUrls && <button className="btn btn-default" onClick={_this.expand_}>Show {numUrls} Links</button>) || "No Links"}</td>
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
                                <th>Links to</th>
                                <th>Found at</th>
                            </tr>
                        </thead>
                        <tbody>
                            { pages.map(page =>
                                    <PageItem key={page.key} page={page} siteDo={siteDo}/>
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
