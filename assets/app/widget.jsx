import React, { PropTypes, Component } from 'react'


class Pages extends React.Component {
    static propTypes = {
        start: PropTypes.number.isRequired,
        end: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
        onClickNext: PropTypes.func,
        onClickPrev: PropTypes.func,
        className: PropTypes.string
    }

    render() {
        const { start, end, total, className, onClickPrev, onClickNext } = this.props
        const _this = this;
        return (
            <span className={className}>
                <b>{start} - {end}</b> of <b>{total}</b> &nbsp;
                <span className="btn-group">
                    <button className={`btn btn-default ${ onClickPrev ? null : 'disabled' }`} onClick={onClickPrev}>
                        <i className="fa fa-chevron-left" />
                    </button>
                    <button className={`btn btn-default ${ onClickNext ? null : 'disabled' }`} onClick={onClickNext}>
                        <i className="fa fa-chevron-right" />
                    </button>
                </span>
            </span>
        )
    }
}

export class Paginate extends React.Component {
    static propTypes = {
        page: PropTypes.number,
        pageSize: PropTypes.number,
        num: PropTypes.number,
        total: PropTypes.number,
        onClickNext: PropTypes.func,
        onClickPrev: PropTypes.func,
        className: PropTypes.string,
        units: PropTypes.string
    }

    static defaultProps = {
        className: 'pull-right'
    }

    constructor() {
        super()
        this.onClickPrev_ = this.onClickPrev_.bind(this)
        this.onClickNext_ = this.onClickNext_.bind(this)
    }

    onClickPrev_(e) {
        if (this.props.page > 1) {
            this.props.onClickPrev(e)
        }
    }

    onClickNext_(e) {
        if (this.props.page * this.props.pageSize < this.props.total) {
            this.props.onClickNext(e)
        }
    }

    render() {
        const { page, pageSize, num, total, className, units } = this.props
        if (!page)
            return null;
        const start = (page - 1) * pageSize + 1
        const end = (num ? start + num - 1 : start);
        const disablePrev = start <= 1;
        const disableNext = end >= total;
        if (disablePrev && disableNext) {
            if (total)
                return (
                    <div>
                        <span className={className}>
                            <b>{start} - {end}</b> of <b>{total}</b>
                        </span>
                        {this.props.children}
                    </div>
                )
            return (
                <span className={className}>
                    <b>No {units || 'results found'}.</b>
                </span>
            )
        }
        const onClickNext_ = disableNext ? null : this.onClickNext_
        const onClickPrev_ = disablePrev ? null : this.onClickPrev_
        return (
            <div>
                <Pages className={className} start={start} end={end} total={total}
                    onClickPrev={onClickPrev_} onClickNext={onClickNext_} />
                {this.props.children}
                <Pages className={className} start={start} end={end} total={total}
                    onClickPrev={onClickPrev_} onClickNext={onClickNext_} />
            </div>
        )
    }
}
