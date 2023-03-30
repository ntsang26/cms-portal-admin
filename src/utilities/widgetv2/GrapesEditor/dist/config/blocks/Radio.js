import CMedia from "../../constants/CMedia.js";

const Radio = {
  id: "radio",
  label: "Radio",
  media: CMedia.radio,
  category: "Form",
  content: `
  <div class="form-check">
    <input class="form-check-input" type="radio" name="flexRadioDefault" id="radio">
    <label class="form-check-label" data-gjs-type="label" for="radio">
      Default radio
    </label>
  </div>
  `,
};

export default Radio;
