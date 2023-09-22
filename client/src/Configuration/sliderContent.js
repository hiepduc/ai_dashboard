import stepButton from "../assets/images/step-button.svg";
import pauseButton from "../assets/images/pause-button.svg";
// import playButton from "../../../assets/images/play-button.svg"

const sliderConfig = {
  labels: [
    {
      parentClass: "time-slider__labels",
      childClass: "time-slider__items",
      indicator: [
        {
          id: "time-slider__start-time",
          text: "Start time:",
          date: "--",
        },
        {
          id: "time-slider__forecast-time",
          text: "Forecast time:",
          date: "--",
        },
        { id: "time-slider__end-time", text: "End time:", date: "--" },
      ],
    },
  ],
  controls: [
    {
      parentClass: "time-slider__controls",
      childClass: "time-slider__control",
      indicator: [
        {
          id: "time-slider__control--backward",
          alt: "Step backward button",
          src: stepButton,
        },
        {
          id: "time-slider__control--motion",
          alt: "Play/pause button",
          src: pauseButton,
        },
        {
          id: "time-slider__control--forward",
          alt: "Step forward button",
          src: stepButton,
        },
      ],
    },
  ],
};

export default sliderConfig;
