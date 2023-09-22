import React, { useState } from "react";
import sliderConfig from "../../../../Configuration/sliderContent"; // Path to your sliderConfig.js

function SliderControls({ onStepForward, onStepBackward, onAutoForwardToggle }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const controlActions = {
    "time-slider__control--backward": onStepBackward,
    "time-slider__control--forward": onStepForward,
    "time-slider__control--motion": () => {
      setIsPlaying((prevIsPlaying) => !prevIsPlaying);
      onAutoForwardToggle(!isPlaying); // Pass the playing state to the parent
    },
  };

  return (
    <div className={sliderConfig.controls[0].parentClass}>
      {sliderConfig.controls[0].indicator.map((control) => (
        <button
          className={`${sliderConfig.controls[0].childClass} ${control.id}`}
          type="button"
          key={control.id}
          onClick={controlActions[control.id]}
        >
          <img src={control.src} alt={control.alt} />
        </button>
      ))}
    </div>
  );
}

export default SliderControls;
