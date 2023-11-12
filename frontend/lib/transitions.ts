import Swup from 'swup';
import SwupA11yPlugin from "@swup/a11y-plugin"
import SwupHeadPlugin from "@swup/head-plugin"

export const install = () => {
  new Swup({
    containers: ['#page', '#page-header'],
    plugins: [new SwupA11yPlugin(), new SwupHeadPlugin({ persistTags: "style" })]
  });
}
