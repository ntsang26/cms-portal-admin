import { CMedia } from "../../constants";

const Media = {
  id: "media",
  label: "Media",
  media: CMedia.image,
  select: true,
  category: "UI Template",
  content: `<div class="card shadow-sm">
  <img src="https://dummyimage.com/721x401" class="card-img-top" >
  <div class="card-body">
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional
          content. This content is a little bit longer.
      </p>
      <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
              <button type="button" data-gjs-type="button" class="btn btn-sm btn-outline-secondary">View</button>
              <button type="button" data-gjs-type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
          </div>
          <small class="text-muted">9 view</small>
      </div>
  </div>
</div>`,
};

export default Media;
