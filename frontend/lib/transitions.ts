import SwupManager from './SwupManager';
import SwupA11yPlugin from "@swup/a11y-plugin";
import SwupHeadPlugin from "@swup/head-plugin";

export const install = () => {

  const options = {
    containers: ['#page', '#page-header', '#page-footer'],
    plugins: [new SwupA11yPlugin(), new SwupHeadPlugin({ persistTags: "style" })],
    debugger: false
  };

  new SwupManager(options);
}
