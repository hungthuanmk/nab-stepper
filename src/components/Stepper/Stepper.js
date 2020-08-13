import React, { Component } from "react";

import PropTypes from "prop-types";

import "./Stepper.scss";
import "./Step.scss";

class Step extends Component {
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

    render() {
        return (
            <div
                className="step"
                onClick={() => this.props.onStepClick(this.props.activateKey)}
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
        this.state = {
            activeStepKey: this.props.activeStepKey,
        };

        this.stepsManager = new Map();
        this.props.children.forEach((step) => {
            this.stepsManager.set(step.props.activateKey, step);
        });
    }

    getActiveState = (idx, key) => {
        let stepKeys = Array.from(this.stepsManager.keys());
        let foundIdx = stepKeys.indexOf(key);
        if (idx < foundIdx) return "visited";
        if (idx === foundIdx) return "activated";
        else return "unvisited";
    };

    render() {
        return (
            <div className="stepper">
                {this.props.children.map((step, idx) =>
                    React.cloneElement(step, {
                        _number: idx + 1,
                        key: idx,
                        onStepClick: this.props.onOrderChange,
                        state: this.getActiveState(
                            idx,
                            this.state.activeStepKey
                        ),
                    })
                )}
            </div>
        );
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            activeStepKey: nextProps.activeStepKey,
        };
    }
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
