import { CColor, CSize } from "./constants";
import _ from "lodash";
export default (editor) => {
  const tm = editor.TraitManager;
  tm.addType("class_select", {
    events: {
      change: "onChange", // trigger parent onChange method on input change
    },
    createInput({ trait }) {
      const md = this.model;
      const opts = md.get("options") || [];
      const input = document.createElement("select");
      const target_view_el = this.target.view.el;

      for (let i = 0; i < opts.length; i++) {
        const option = document.createElement("option");
        let value = opts[i].value;
        if (value === "") {
          value = "GJS_NO_CLASS";
        } // 'GJS_NO_CLASS' represents no class--empty string does not trigger value change
        option.text = opts[i].name;
        option.value = value;

        // Convert the Token List to an Array
        const css = Array.from(target_view_el.classList);

        const value_a = value.split(" ");
        const intersection = css.filter((x) => value_a.includes(x));

        if (intersection.length === value_a.length) {
          option.setAttribute("selected", "selected");
        }

        input.append(option);
      }
      return input;
    },
    onUpdate({ elInput, component }) {
      const classes = component.getClasses();
      const opts = this.model.get("options") || [];
      for (let i = 0; i < opts.length; i++) {
        let value = opts[i].value;
        if (value && classes.includes(value)) {
          elInput.value = value;
          return;
        }
      }
      elInput.value = "GJS_NO_CLASS";
    },

    onEvent({ elInput, component, event }) {
      const classes = this.model.get("options").map((opt) => opt.value);
      for (let i = 0; i < classes.length; i++) {
        if (classes[i].length > 0) {
          const classes_i_a = classes[i].split(" ");
          for (let j = 0; j < classes_i_a.length; j++) {
            if (classes_i_a[j].length > 0) {
              component.removeClass(classes_i_a[j]);
            }
          }
        }
      }
      const value = this.model.get("value");

      // This piece of code removes the empty attribute name from attributes list
      const elAttributes = component.attributes.attributes;
      delete elAttributes[""];

      if (value.length > 0 && value !== "GJS_NO_CLASS") {
        const value_a = value.split(" ");
        for (let i = 0; i < value_a.length; i++) {
          component.addClass(value_a[i]);
        }
      }
      component.em.trigger("component:toggled");
    },
  });

  const dc = editor.DomComponents;
  dc.addType("image", {
    isComponent: el => (el.tagName || "").toLowerCase() === 'img',
    model: {
      defaults: {
        traits: ["alt", "src", "data-src", "id"],
      },
    },
  });
  dc.addType("input", {
    isComponent: (el) => el.tagName === "INPUT",
    model: {
      defaults: {
        traits: [
          "id",
          "placeholder",
          "name",
          "pattern",
          {
            type: "select",
            label: "Type",
            name: "type",
            options: [
              { id: "text", name: "Text" },
              { id: "email", name: "Email" },
              { id: "password", name: "Password" },
              { id: "number", name: "Number" },
            ],
          },
          {
            type: "checkbox",
            name: "required",
          },
          {
            type: "class_select",
            label: "Size",
            options: CSize.map((sz) => {
              return {
                value: `form-control-${sz.class}`,
                name: sz.title,
              };
            }),
          },
        ],
      },
    },
  });
  dc.addType("textarea", {
    isComponent: (el) => el.tagName === "TEXTAREA",
    model: {
      defaults: {
        traits: [
          "id",
          "placeholder",
          "name",
          "pattern",
          {
            type: "checkbox",
            name: "required",
          },
        ],
      },
    },
  });
  dc.addType("text", {
    isComponent: (el) => el.tagName === "TEXTAREA",
    model: {
      defaults: {
        traits: ["title ", "data-type", "id"],
      },
    },
  });
  dc.addType("button", {
    isComponent: (el) => el.tagName == "button",
    model: {
      defaults: {
        traits: [
          {
            type: "class_select",
            label: "Color",
            options: [
              { value: "", name: "none" },
              ...CColor.map((color) => {
                return { value: `btn-${color}`, name: color };
              }),
              ...CColor.map((color) => {
                return {
                  value: `btn-outline-${color}`,
                  name: `outline ${color}`,
                };
              }),
            ],
          },
          {
            type: "select", // Type of the trait
            label: "Type", // The label you will see in Settings
            name: "type", // The name of the attribute/property to use on component
            options: [
              { id: "button", name: "Button" },
              { id: "submit", name: "Submit" },
              { id: "resest", name: "Resest" },
            ],
          },
          {
            type: "checkbox",
            name: "disable",
          },
          "name",
          "id",
        ],
      },
    },
  });
  dc.addType("link", {
    isComponent: (el) => (el.tagName || "").toLowerCase() == "a",
    model: {
      defaults: {
        traits: [
          // {
          //   type: "select",
          //   label: "color",
          //   name: "class",
          //   options: [
          //     { id: "", name: "default" },
          //     { id: "link-primary", name: "primary" },
          //     { id: "link-warning", name: "warning" },
          //     { id: "link-danger", name: "danger" },
          //     { id: "link-success", name: "success" },
          //   ],
          // },
          "target",
          "href",
        ],
      },
    },
  });
  dc.addType("map", {
    isComponent: (el) => {
      const { classList = [] } = el
      for (const className of classList) {
        if (className == "map" || className.match(/^map-/)) return true;
      }
    },
    model: {
      defaults: {
        traits: ["src"],
      },
    },
  });
  dc.addType("custom-column", {
    isComponent: (el) => {
      const { classList = [] } = el
      for (const className of classList) {
        if (className == "col" || className.match(/^col-/)) return true;
      }
    },
    model: {
      defaults: {
        traits: [
          { name: "id" },
          {
            type: "class_select",
            label: "Size",
            options: [
              { value: "", name: "None" },
              { value: "col-sm-auto", name: "Variable" },
              ..._.flattenDeep(
                CSize.map((value) =>
                  column_width.map((w) => {
                    return {
                      value: `col-${value.class}-${w}`,
                      name: `${value.title}-${w}`,
                    };
                  })
                )
              ),
            ],
          },
        ],
      },
    },
  });
  dc.addType("label", {
    isComponent: el => (el.tagName || "").toLowerCase() === 'label',
    model: {
      defaults: {
        tagName: "label",
        traits: [
          {
            name: "for",
          },
        ],
      },
    },
  });
  dc.addType("form", {
    isComponent: (el) => el.tagName === "FORM",
    model: {
      defaults: {
        traits: [
          {
            type: "select",
            label: "Enctype",
            name: "enctype",
            options: [
              {
                value: "application/x-www-form-urlencoded",
                name: "application/x-www-form-urlencoded (default)",
              },
              { value: "multipart/form-data", name: "multipart/form-data" },
              { value: "text/plain", name: "text/plain" },
            ],
          },
          {
            type: "select",
            label: "Method",
            name: "method",
            options: [
              { value: "post", name: "POST" },
              { value: "get", name: "GET" },
            ],
          },
          "action",
        ],
      },

      init() {
        this.listenTo(this, "change:formState", this.updateFormState);
      },

      updateFormState() {
        let state = this.get("formState");
        switch (state) {
          case "success":
            this.showState("success");
            break;
          case "error":
            this.showState("error");
            break;
          default:
            this.showState("normal");
        }
      },

      showState(state) {
        let st = state || "normal";
        let failVis, successVis;
        if (st === "success") {
          failVis = "none";
          successVis = "block";
        } else if (st === "error") {
          failVis = "block";
          successVis = "none";
        } else {
          failVis = "none";
          successVis = "none";
        }
        let successModel = this.getStateModel("success");
        let failModel = this.getStateModel("error");
        let successStyle = successModel.getStyle();
        let failStyle = failModel.getStyle();
        successStyle.display = successVis;
        failStyle.display = failVis;
        successModel.setStyle(successStyle);
        failModel.setStyle(failStyle);
      },

      getStateModel(state) {
        let st = state || "success";
        let stateName = "form-state-" + st;
        let stateModel;
        let comps = this.get("components");
        for (let i = 0; i < comps.length; i++) {
          let model = comps.models[i];
          if (model.get("form-state-type") === st) {
            stateModel = model;
            break;
          }
        }
        if (!stateModel) {
          let contentStr = "Success";
          if (st === "error") contentStr = "Error";

          stateModel = comps.add({
            "form-state-type": st,
            type: "text",
            removable: false,
            copyable: false,
            draggable: false,
            attributes: { "data-form-state": st },
            content: contentStr,
          });
        }
        return stateModel;
      },
    },
    view: {
      events: {
        submit(e) {
          e.preventDefault();
        },
      },
    },
  });
  dc.addType("radio", {
    isComponent: (el) => {
      if (el.tagName === "INPUT" && el.type === "radio") {
        return { type: "radio" };
      }
    },
    model: {
      defaults: {
        attributes: { type: 'radio' },
        traits: [
          "id",
          "name",
          {
            type: "checkbox",
            name: "required",
          },
          {
            type: "checkbox",
            name: "checked",
          },
          {
            type: "checkbox",
            name: "disable",
          },
        ]
      },
    },
  });
  dc.addType("checkbox", {
    isComponent: (el) => {
      if (el.tagName === "INPUT" && el.type === "checkbox") {
        return { type: "checkbox" };
      }
    },
    model: {
      defaults: {
        copyable: false,
        droppable: false,
        attributes: { type: "checkbox" },
        traits: [
          "id",
          "name",
          "value",
          {
            type: "checkbox",
            name: "required",
          },
          {
            type: "checkbox",
            name: "checked",
          },
        ],
      },

      init() {
        this.listenTo(this, "change:checked", this.handleChecked);
      },

      handleChecked() {
        let checked = this.get("checked");
        let attrs = this.get("attributes");
        const view = this.view;

        if (checked) {
          attrs.checked = true;
        } else {
          delete attrs.checked;
        }

        if (view) {
          view.el.checked = checked;
        }

        this.set("attributes", { ...attrs });
      },
    },
    view: {
      events: {
        click: "handleClick",
      },

      handleClick(e) {
        e.preventDefault();
      },
    },
  });
};

const column_width = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
