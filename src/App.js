import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Stepper, Step } from "./components/Stepper/Stepper";

function App() {
    return (
        <div className="App">
            <Stepper>
              <Step activateKey={1} title="Supplier"/>
              <Step activateKey={2} title="Basic Infomation"/>
              <Step activateKey={3} title="Language"/>
            </Stepper>
        </div>
    );
}

export default App;
