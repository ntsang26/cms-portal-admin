export default {
  devices: [
    {
      name: "Desktop",
      width: "", // default size
    },
    {
      name: "Mobile",
      width: "576px", // this value will be used on canvas width
      widthMedia: "576px", // this value will be used in CSS @media
    },
    {
      name: "Tablet",
      width: "768px",
      widthMedia: "800px",
    },
  ],
};
