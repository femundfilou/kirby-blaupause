import Button from "./components/Button.vue";
import Heading from "./components/Heading.vue";
import Text from "./components/Text.vue";
import List from "./components/List.vue";

window.panel.plugin("femundfilou/blaupause-block-previews", {
  blocks: {
    button: Button,
    heading: Heading,
    text: Text,
    list: List
  }
});
