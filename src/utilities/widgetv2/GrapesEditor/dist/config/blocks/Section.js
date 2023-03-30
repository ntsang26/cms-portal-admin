import { CMedia } from "../../constants";

const Section = {
  id: "section",
  label: "Section",
  media: CMedia.sections,
  attributes: { class: "gjs-block-section" },
  category: "Basic",
  content: `<section>
    <h1>This is a simple title</h1>
    <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
    </section>`,
};

export default Section;
