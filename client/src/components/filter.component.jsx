import React, {Component} from "react";

import RentService from "../services/rent-ad.service";

export default class Filter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        RentService.fetchAll().then(
            ({response}) => {
                console.log('response in filter', response)
                this.setState({
                    content: response
                });
                console.log('content', response)
            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    render() {
        return (
            <div className="container">
                <header className="jumbotron">
                    <h1>Страница с лентой и фильтром</h1>
                    {/*<h3>{this.state.content}</h3>*/}
                    {this.state.content ? this.state.content.map(ad => {
                        return <div>{ad.email}</div>
                    }) : null
                    }
                </header>
            </div>
        );
    }
}
