import React from "react";
import "./style.css";

//Sort Menu Items based on VEG  and  Non-Veg options
function ToggleSwitch(props) {

  return (

    <div className="switch-container">
      <span className="veg-only-label">
        Veg Only
        <input
          checked={props.isChecked}
          onChange={props.handleToggle}
          className="switch"
          type="checkbox" />
        <div>
          <div></div>
        </div>
    </span>
    </div>
  );
}

export default ToggleSwitch;