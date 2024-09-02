import ScrollAnimations from "../services/ScrollAnimations";
import SplitWords from "../services/SplitWords";

export const install = () => {
  // Initialize ScrollAnimations
  ScrollAnimations.getInstance();
  new SplitWords();
}
