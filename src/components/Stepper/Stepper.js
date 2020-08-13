import React, { Component } from "react";

import PropTypes from "prop-types";

import "./Stepper.scss";

class Step extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <></>;
    }
}

class Stepper extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="container">This is a stepper</div>;
    }
}

Stepper.PropTypes = {
    children: PropTypes.arrayOf(PropTypes.instanceOf(Stepper)).isRequired,
    activeStepKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onOrderChange: PropTypes.func.isRequired,
    directory: PropTypes.oneOf(["VERTICAL", "HORIZONTAL"])
}

export { Step, Stepper };
