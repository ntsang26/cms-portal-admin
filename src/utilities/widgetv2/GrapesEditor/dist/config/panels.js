import { CCommands } from "../constants";

export default {
  defaults: [
    {
      id: "layers",
      el: ".panel__right",
    },
    {
      id: "panel-switcher",
      el: ".panel__switcher",
      buttons: [
        {
          id: "show-layers",
          label: `<i class=" fa fa-bars"></i>`,
          command: CCommands.showLayers,
        },
        {
          id: "show-style",
          label: `<i class="fa fa-paint-brush"></i>`,
          command: CCommands.showStyles,
        },
        {
          id: "show-traits",
          label: `<i class="fa fa-cog"></i>`,
          command: CCommands.showTraits,
        },
        {
          id: "show-blocks",
          active: true,
          label: `<i class="fa fa-th-large"></i>`,
          command: CCommands.showBlocks,
        },
      ],
    },
    {
      id: "panel-devices",
      el: ".panel__devices",
      buttons: [
        {
          id: "device-desktop",
          label: `<i class="fa fa-desktop"></i>`,
          command: CCommands.setDeviceDesktop,
          active: true,
        },
        {
          id: "device-tablet",
          label: `<i class="fa fa-tablet"></i>`,
          command: CCommands.setDeviceTablet,
        },
        {
          id: "device-mobile",
          label: `<i class="fa fa-mobile"></i>`,
          command: CCommands.setDeviceMobile,
        },
      ],
    },
  ],
};
