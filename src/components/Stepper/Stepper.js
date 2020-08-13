import React, { Component } from "react";

import PropTypes from "prop-types";

import "./Stepper.scss";
import "./Step.scss";

class Step extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="step" onClick={()=>console.log("Hello")}>
                {/* number */}
                <div> 

                </div>
                {/* text */}
                <div>
                    {this.props.title}
                </div>
            </div>
        );
    }
}

class Stepper extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div className="stepper">
                {this.props.children.map((step) => (
                    step
                ))}
            </div>
        );
    }

    static getDerivedStateFromProps(props, state) {

    }
}

Step.propTypes = {
    title: PropTypes.node.isRequired,
    activateKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

Stepper.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    activeStepKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onOrderChange: PropTypes.func.isRequired,
    directory: PropTypes.oneOf(["VERTICAL", "HORIZONTAL"]),
};

export { Step, Stepper };
