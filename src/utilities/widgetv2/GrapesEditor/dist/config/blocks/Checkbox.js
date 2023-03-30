import CMedia from "../../constants/CMedia.js";

const Checkbox = {
  id: "checkbox",
  label: "Checkbox",
  media: CMedia.checkbox,
  category: "Form",
  content: `
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="check">
    <label class="form-check-label" data-gjs-type="label" for="check">
      Default checkbox
    </label>
  </div>
  `,
};

export default Checkbox;
