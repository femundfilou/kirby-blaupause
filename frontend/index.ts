import "./assets/panel/favicon-dev.svg";
import "cleacss/css";
import "./index.css"

// Auto-load modules in lib
for (const m of Object.values(
  import.meta.glob("./lib/*.ts", { eager: true })
)) {
  (m as any).install?.();
}
