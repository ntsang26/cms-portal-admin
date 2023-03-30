import { CMedia } from "../../constants";

const Feature = {
  id: "button",
  label: "Feature",
  media: CMedia.button,
  category: "UI Template",
  content: `<div class="feature">
  <div class="feature-icon bg-primary bg-gradient">
      <svg class="bi" width="1em" height="1em">
          <use xlink:href="#collection" />
      </svg>
  </div>
  <h2>Featured title</h2>
  <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and
      probably just keep going until we run out of words.</p>
  <a href="#" data-gjs-type="link" style="display: inline-flex; align-items: center" >
      Call to action
      <svg class="bi" width="1em" height="1em">
          <use xlink:href="#chevron-right" />
      </svg>
  </a>
</div>`,
};

export default Feature;
