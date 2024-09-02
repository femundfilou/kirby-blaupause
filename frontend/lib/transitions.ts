import SwupManager from '../services/SwupManager';
import SwupA11yPlugin from "@swup/a11y-plugin";
import SwupHeadPlugin from "@swup/head-plugin";
import ScrollAnimations from '../services/ScrollAnimations';
import SplitWords from '../services/SplitWords';

export const install = () => {

  const options = {
    containers: ['#page', '#page-header', '#page-footer'],
    plugins: [new SwupA11yPlugin(), new SwupHeadPlugin({ persistTags: "style" })]
  };

  const manager = new SwupManager(options);

  manager.swup.hooks.on('page:view', (visit) => {
    ScrollAnimations.getInstance();
    new SplitWords();
  });

  manager.swup.hooks.on('content:replace', () => {
    const animations = ScrollAnimations.getInstance();
    animations.destroy();
  });
}
