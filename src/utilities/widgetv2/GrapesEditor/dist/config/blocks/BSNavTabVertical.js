import CMedia from '../../constants/CMedia.js';

const BSNavTabVertical = {
  id: "bs-navtab-vertical",
  label: "BS NavTab Vertical",
  category: "UI Template",
  media: CMedia.header,
  content: `
  <div data-gjs-type="default" class="d-flex align-items-start">
  <div data-gjs-type="default" class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
    <div data-gjs-type="default" class="nav-link active" id="v-pills-tab1-tab" data-bs-toggle="pill" data-bs-target="#v-pills-tab1" role="tab" aria-controls="v-pills-tab1" aria-selected="true">
        <div data-gjs-type="text">Tab1</div>
    </div>
    <div data-gjs-type="default" class="nav-link" id="v-pills-tab2-tab" data-bs-toggle="pill" data-bs-target="#v-pills-tab2" role="tab" aria-controls="v-pills-tab2" aria-selected="false">
        <div data-gjs-type="text">Tab2</div>
    </div>
    <div data-gjs-type="default" class="nav-link" id="v-pills-tab3-tab" data-bs-toggle="pill" data-bs-target="#v-pills-tab3" role="tab" aria-controls="v-pills-tab3" aria-selected="false">
        <div data-gjs-type="text">Tab3</div>
    </div>
    <div data-gjs-type="default" class="nav-link" id="v-pills-tab-4-tab" data-bs-toggle="pill" data-bs-target="#v-pills-tab-4" role="tab" aria-controls="v-pills-tab-4" aria-selected="false">
        <div data-gjs-type="text">Tab4</div>
    </div>
  </div>
  <div data-gjs-type="default" class="tab-content" id="v-pills-tabContent">
    <div data-gjs-type="default" class="tab-pane fade show active" id="v-pills-tab1" role="tabpanel" aria-labelledby="v-pills-tab1-tab">
        <div data-gjs-type="text" class="m-2">Tab1</div>
    </div>
    <div data-gjs-type="default" class="tab-pane fade" id="v-pills-tab2" role="tabpanel" aria-labelledby="v-pills-tab2-tab">
        <div data-gjs-type="text" class="m-2">Tab2</div>
    </div>
    <div data-gjs-type="default" class="tab-pane fade" id="v-pills-tab3" role="tabpanel" aria-labelledby="v-pills-tab3-tab">
        <div data-gjs-type="text" class="m-2">Tab3</div>
    </div>
    <div data-gjs-type="default" class="tab-pane fade" id="v-pills-tab-4" role="tabpanel" aria-labelledby="v-pills-tab-4-tab">
        <div data-gjs-type="text" class="m-2">Tab4</div>
    </div>
  </div>
</div>
  `,
};

export default BSNavTabVertical;