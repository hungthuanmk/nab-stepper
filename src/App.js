import React, { useState } from "react";

import { Stepper, Step } from "./components/Stepper/Stepper";

function App() {
    const [currentStepKey, setStepKey] = useState("a");
    return (
        <div className="App">
            <Stepper
                activeStepKey={currentStepKey}
                onOrderChange={(newStepKey) => {
                    console.log(newStepKey);
                    setStepKey(newStepKey);
                }}
            >
                <Step activateKey={"a"} title="Supplier" />
                <Step activateKey={"b"} title="Basic Infomation" />
                <Step activateKey={"c"} title="Language" />
                <Step activateKey={"d"} title="About" />
            </Stepper>
        </div>
    );
}

export default App;
