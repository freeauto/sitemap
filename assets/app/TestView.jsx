import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import connect from 'utils/do-connect.jsx'
import { TestDo } from './do/TestDo.jsx'

export class TestView extends React.Component {
    renderContent() {
        const { tests, loading } = this.props.testSt;

        if (loading)
            return (
                <h1>Loading...</h1>
            )

        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Test</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tests.map(test =>
                                <tr key={test}><td>{test}</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }

    render() {
        const { error } = this.props.testSt
        return (
            <div>
                <h1>Tests</h1>
                { error ? <div className="alert alert-danger">Uh oh! { error }</div> : null }
                {this.renderContent()}
            </div>
        )
    }

    static propTypes = {
        testSt: PropTypes.object.isRequired,
        testDo: PropTypes.object.isRequired
    }
}

TestView = connect({
    test: TestDo
})(TestView)
