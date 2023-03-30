import CMedia from '../../constants/CMedia.js';

const BSNavTabHorizontal = {
  id: "bs-navtab-horizontal",
  label: "BS NavTab Horizontal",
  category: "UI Template",
  media: CMedia.header,
  content: `
  <ul class="nav nav-pills mb-3" role="tablist">
    <div data-gjs-type="default" class="nav-link active" id="v-pills-tab1-tab" data-bs-toggle="pill" data-bs-target="#v-pills-tab1" role="tab" aria-controls="v-pills-tab1" aria-selected="true">
      <div data-gjs-type="text">Tab1</div>
    </div>
    <div data-gjs-type="default" class="nav-link" id="v-pills-tab2-tab" data-bs-toggle="pill" data-bs-target="#v-pills-tab2" role="tab" aria-controls="v-pills-tab2" aria-selected="false">
      <div data-gjs-type="text">Tab2</div>
    </div>
    <div data-gjs-type="default" class="nav-link" id="v-pills-tab3-tab" data-bs-toggle="pill" data-bs-target="#v-pills-tab3" role="tab" aria-controls="v-pills-tab3" aria-selected="false">
      <div data-gjs-type="text">Tab3</div>
    </div>
  </ul>
  <div class="tab-content">
    <div data-gjs-type="default" class="tab-pane fade show active" id="v-pills-tab1" role="tabpanel" aria-labelledby="v-pills-tab1-tab">
      <span data-gjs-type="text" class="m-2">Tab1</span>
    </div>
    <div data-gjs-type="default" class="tab-pane fade" id="v-pills-tab2" role="tabpanel" aria-labelledby="v-pills-tab2-tab">
      <span data-gjs-type="text" class="m-2">Tab2</span>
    </div>
    <div data-gjs-type="default" class="tab-pane fade" id="v-pills-tab3" role="tabpanel" aria-labelledby="v-pills-tab3-tab">
      <span data-gjs-type="text" class="m-2">Tab3</span>
    </div>
  </div>
  `,
};

export default BSNavTabHorizontal;