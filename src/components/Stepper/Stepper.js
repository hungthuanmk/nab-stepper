import React, { Component } from "react";

import PropTypes from "prop-types";

import "./Stepper.scss";
import "./Step.scss";

class Step extends Component {
    // constructor(props) {
    //     super(props);
    // }

    styleMap = {
        unvisited: {
            number: "step-number-unvisited",
            label: "step-label-unvisited",
        },
        visited: { number: "step-number-visited", label: "step-label-visited" },
        activated: {
            number: "step-number-activated",
            label: "step-label-activated",
        },
    };

    getStyle = (className) => this.styleMap[this.props.state][className];

    // onStepClick = (number) =>
    //     this.props.onStepClickHandler(number);

    render() {
        return (
            <div
                className="step"
                onClick={() => this.props.onStepClick(this.props._number)}
            >
                {/* number */}
                <div className={this.getStyle("number")}>
                    {this.props._number}
                </div>
                {/* text */}
                <div className={this.getStyle("label")}>{this.props.title}</div>
            </div>
        );
    }
}

class Stepper extends Component {
    constructor(props) {
        super(props);
        this.props.children.map((step, idx) =>
            React.cloneElement(step, { _number: idx + 1 })
        );
    }

    onStepClickHandler = (stepNumber) => {
        console.log(`Step ${stepNumber} clicked!`);
    };

    render() {
        return (
            <div className="stepper">
                {/* {this.props.children} */}
                {this.props.children.map((step, idx) =>
                    React.cloneElement(step, {
                        _number: idx + 1,
                        onStepClick: this.onStepClickHandler,
                        state: "visited",
                    })
                )}
            </div>
        );
    }

    // static getDerivedStateFromProps(props, state) {}
}

Step.propTypes = {
    title: PropTypes.node.isRequired,
    activateKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
};

Stepper.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    activeStepKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onOrderChange: PropTypes.func.isRequired,
    directory: PropTypes.oneOf(["VERTICAL", "HORIZONTAL"]),
};

export { Step, Stepper };
