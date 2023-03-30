import { CMedia } from "../../constants";

const DropdownButton = {
  id: "dropdown-button",
  label: "Dropdown Button",
  media: CMedia.button,
  category: "Basic",
  content: `
  <div class="dropdown">
    <a data-gjs-type="button" href="#" role="button" class="btn btn-primary dropdown-toggle" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
      Dropdown button
    </a>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
      <li><a class="dropdown-item" href="#">Action</a></li>
      <li><a class="dropdown-item" href="#">Another action</a></li>
      <li><a class="dropdown-item" href="#">Something else here</a></li>
    </ul>
  </div>`,
};

export default DropdownButton;
