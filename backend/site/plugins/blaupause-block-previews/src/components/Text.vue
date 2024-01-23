<template>
  <div :data-style="content.style" :data-alignment="content.alignment">
    <component :is="component" ref="input" v-bind="textField" :keys="keys" :value="content.text"
      class="k-block-type-text-input" @input="update({ text: $event })" />
  </div>
</template>

<script>
/**
 * @displayName BlockTypeText
 * @internal
 */
export default {
  computed: {
    component() {
      const component = "k-" + this.textField.type + "-input";

      if (this.$helper.isComponent(component)) {
        return component;
      }

      // fallback to writer
      return "k-writer-input";
    },
    isSplitable() {
      return (
        this.content.text.length > 0 &&
        this.input().isCursorAtStart === false &&
        this.input().isCursorAtEnd === false
      );
    },
    keys() {
      const keys = {
        "Mod-Enter": this.split
      };

      if (this.textField.inline === true) {
        keys.Enter = this.split;
      }

      return keys;
    },
    textField() {
      return this.field("text", {});
    }
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    },
    input() {
      return this.$refs.input.$refs.input;
    },
    merge(blocks) {
      this.update({
        text: blocks
          .map((block) => block.content.text)
          .join(this.textField.inline ? " " : "")
      });
    },
    split() {
      const contents = this.input().getSplitContent?.();

      if (contents) {
        if (this.textField.type === "writer") {
          contents[0] = contents[0].replace(/(<p><\/p>)$/, "");
          contents[1] = contents[1].replace(/^(<p><\/p>)/, "");
        }

        this.$emit(
          "split",
          contents.map((content) => ({ text: content }))
        );
      }
    }
  }
};
</script>

<style scoped>
.k-block-type-text-input {
  line-height: 1.5;
  height: 100%;
}

.k-block-container.k-block-container-type-text {
  padding: 0;
}

.k-block-type-text-input.k-writer[data-toolbar-inline="true"] {
  padding: var(--spacing-3);
}

.k-block-type-text-input.k-writer:not([data-toolbar-inline="true"])>.ProseMirror,
.k-block-type-text-input.k-writer:not([data-toolbar-inline="true"])[data-placeholder][data-empty="true"]:before {
  padding: var(--spacing-3) var(--spacing-6);
}

[data-alignment="left"] {
  text-align: left;
}

[data-alignment="centered"] {
  text-align: center;
}

[data-alignment="right"] {
  text-align: right;
}

[data-style="small"] {
  font-size: var(--clea-size-7);
}

[data-style="default"] {
  font-size: var(--clea-size-6);
}

[data-style="large"] {
  font-size: var(--clea-size-5);
}
</style>
