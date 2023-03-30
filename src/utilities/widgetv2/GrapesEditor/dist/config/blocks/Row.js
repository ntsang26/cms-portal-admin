import { CMedia } from "../../constants";

const Row = {
  id: "cutom-row",
  label: "Row",
  media: CMedia.row,
  select: false,
  category: "Basic",
  content: `<div class="row mx-0 py-2 px-1 min-height-10">
  <div data-gjs-type="custom-column" class="col py-2 px-1"></div>
  <div data-gjs-type="custom-column" class="col py-2 px-1"></div>
  </div>`,
};
export default Row;
