//mostly code from the reactjs.org/error-boundaries.html

import React, { Component } from 'react';
import { Link, Redirect } from '@reach/router';

class ErrorBoundaryPrac extends Component {
    public state = { hasError: false , redirect: false }
    public static getDerivedStateFromError () {
        return { hasError: true};
    }
    public componentDidCatch(error: Error, info: ErrorInfo) {
        console.error("ErrorBoundaryPrac caught an error", error, info);
    }
    public componentDidUpdate() {
        if(this.state.hasError) {
            setTimeout(() => this.setState({ redirect: true}), 5000);
        }
    }
    public render() {
        if (this.state.redirect) {
            return <Redirect to="/" />;
        }
        if(this.state.hasError){
            return (
                <h1>
                    There was an error with this listing. <Link to="/">Click here</Link> to go back to the home page or wait five seconds.
                </h1>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundaryPrac;