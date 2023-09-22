const resetButton = {
  id: "reset-button",
  className: "select-button",
  buttonContent: "Reset selection",
};

const visibilityButton = [
  {
    id: "toggle-button__station",
    className: "layer-button layer-button__active",
    buttonContent: "Air quality station",
  },
  {
    id: "toggle-button__sensor",
    className: "layer-button layer-button__disable",
    buttonContent: "PurpleAir sensor",
  },
];

export { resetButton, visibilityButton };
