import React, { Component } from "react";

import PropTypes from "prop-types";

import "./Stepper.scss";
import "./Step.scss";

class Step extends Component {
    getStyle = (className) => `step-${className}-${this.props.state}`;

    getLinesStyle() {
        let lineBeforeStyle = this.props.start
            ? "number-area-line-hidden"
            : "number-area-line-visible";
        let lineAfterStyle = this.props.end
            ? "number-area-line-hidden"
            : "number-area-line-visible";

        if (this.props.state === "visited") {
            lineBeforeStyle =
                this.props.start === false ? "number-area-line-bold" : "";
            lineAfterStyle = "number-area-line-bold";
        }
        if (this.props.state === "activated" && this.props.start === false)
            lineBeforeStyle = "number-area-line-bold";
        return [lineBeforeStyle, lineAfterStyle];
    }

    render() {
        let [lineBeforeStyle, lineAfterStyle] = this.getLinesStyle();
        return (
            <div
                className="step"
                onClick={() => this.props.onStepClick(this.props.activateKey)}
            >
                {/* number-section */}
                <div className="number-area">
                    {/* tail-before */}
                    <div className={`number-area-line ${lineBeforeStyle}`} />
                    {/* number-circle */}
                    <div className={this.getStyle("number")}>
                        {this.props._number}
                    </div>
                    {/* tail-after */}
                    <div className={`number-area-line ${lineAfterStyle}`} />
                </div>

                {/* title */}
                <div className={this.getStyle("label")}>{this.props.title}</div>
            </div>
        );
    }
}

class Stepper extends Component {
    constructor(props) {
        super(props);

        this.stepsKeyMap = new Map(); // 
        this.props.children.forEach((step) => {
            this.stepsKeyMap.set(step.props.activateKey, step);
        });
    }

    getActiveState = (idx, key) => {
        let stepKeys = Array.from(this.stepsKeyMap.keys());
        let foundIdx = stepKeys.indexOf(key);
        if (idx < foundIdx) return "visited";
        if (idx === foundIdx) return "activated";
        else return "unvisited";
    };

    render() {
        return (
            <div className="stepper" style={{ ...this.props.style }}>
                {this.props.children.map((step, idx) =>
                    React.cloneElement(step, {
                        _number: idx + 1,
                        key: idx,
                        onStepClick: this.props.onOrderChange,
                        state: this.getActiveState(
                            idx,
                            this.props.activeStepKey
                        ),
                        start: idx === 0,
                        end: idx === this.props.children.length - 1,
                    })
                )}
            </div>
        );
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
    // directory: PropTypes.oneOf(["VERTICAL", "HORIZONTAL"]),
};

export { Step, Stepper };
