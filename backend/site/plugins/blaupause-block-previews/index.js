(function() {
  "use strict";
  const Button_vue_vue_type_style_index_0_lang = "";
  function normalizeComponent(scriptExports, render, staticRenderFns, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
    var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
    if (render) {
      options.render = render;
      options.staticRenderFns = staticRenderFns;
      options._compiled = true;
    }
    if (functionalTemplate) {
      options.functional = true;
    }
    if (scopeId) {
      options._scopeId = "data-v-" + scopeId;
    }
    var hook;
    if (moduleIdentifier) {
      hook = function(context) {
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
        if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
          context = __VUE_SSR_CONTEXT__;
        }
        if (injectStyles) {
          injectStyles.call(this, context);
        }
        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      };
      options._ssrRegister = hook;
    } else if (injectStyles) {
      hook = shadowMode ? function() {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        );
      } : injectStyles;
    }
    if (hook) {
      if (options.functional) {
        options._injectStyles = hook;
        var originalRender = options.render;
        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }
    return {
      exports: scriptExports,
      options
    };
  }
  const _sfc_main$3 = {
    // Put your section logic here
  };
  var _sfc_render$3 = function render() {
    var _vm = this, _c = _vm._self._c;
    return _c("input", { class: ["button", `is-${_vm.content.style}`], attrs: { "type": "text", "placeholder": _vm.placeholder }, domProps: { "value": _vm.content.text }, on: { "input": function($event) {
      return _vm.update({ text: $event.target.value });
    } } });
  };
  var _sfc_staticRenderFns$3 = [];
  _sfc_render$3._withStripped = true;
  var __component__$3 = /* @__PURE__ */ normalizeComponent(
    _sfc_main$3,
    _sfc_render$3,
    _sfc_staticRenderFns$3,
    false,
    null,
    null,
    null,
    null
  );
  __component__$3.options.__file = "/Users/justuskraft/Server/kirby-blaupause/backend/site/plugins/blaupause-block-previews/src/components/Button.vue";
  const Button = __component__$3.exports;
  const Heading_vue_vue_type_style_index_0_lang = "";
  const _sfc_main$2 = {
    computed: {
      isSplitable() {
        return this.content.text.length > 0 && this.$refs.input.isCursorAtStart === false && this.$refs.input.isCursorAtEnd === false;
      },
      keys() {
        return {
          Enter: () => {
            if (this.$refs.input.isCursorAtEnd === true) {
              return this.$emit("append", "text");
            }
            return this.split();
          },
          "Mod-Enter": this.split
        };
      },
      levels() {
        return this.field("level", { options: [] }).options;
      },
      textField() {
        return this.field("text", {
          marks: true
        });
      }
    },
    methods: {
      focus() {
        this.$refs.input.focus();
      },
      merge(blocks) {
        this.update({
          text: blocks.map((block) => block.content.text).join(" ")
        });
      },
      split() {
        var _a, _b;
        const contents = (_b = (_a = this.$refs.input).getSplitContent) == null ? void 0 : _b.call(_a);
        if (contents) {
          this.$emit("split", [
            { text: contents[0] },
            {
              // decrease heading level for newly created block
              level: "h" + Math.min(parseInt(this.content.level.slice(1)) + 1, 6),
              text: contents[1]
            }
          ]);
        }
      }
    }
  };
  var _sfc_render$2 = function render() {
    var _vm = this, _c = _vm._self._c;
    return _c("div", { staticClass: "k-block-type-heading-input", attrs: { "data-level": _vm.content.level, "data-style": _vm.content.style } }, [_c("k-writer", _vm._b({ ref: "input", attrs: { "inline": true, "keys": _vm.keys, "value": _vm.content.text }, on: { "input": function($event) {
      return _vm.update({ text: $event });
    } } }, "k-writer", _vm.textField, false)), _vm.levels.length > 1 ? _c("k-input", { ref: "level", staticClass: "k-block-type-heading-level", attrs: { "empty": false, "options": _vm.levels, "value": _vm.content.level, "type": "select" }, on: { "input": function($event) {
      return _vm.update({ level: $event });
    } } }) : _vm._e()], 1);
  };
  var _sfc_staticRenderFns$2 = [];
  _sfc_render$2._withStripped = true;
  var __component__$2 = /* @__PURE__ */ normalizeComponent(
    _sfc_main$2,
    _sfc_render$2,
    _sfc_staticRenderFns$2,
    false,
    null,
    null,
    null,
    null
  );
  __component__$2.options.__file = "/Users/justuskraft/Server/kirby-blaupause/backend/site/plugins/blaupause-block-previews/src/components/Heading.vue";
  const Heading = __component__$2.exports;
  const Text_vue_vue_type_style_index_0_lang = "";
  const _sfc_main$1 = {
    computed: {
      component() {
        const component = "k-" + this.textField.type + "-input";
        if (this.$helper.isComponent(component)) {
          return component;
        }
        return "k-writer-input";
      },
      isSplitable() {
        return this.content.text.length > 0 && this.input().isCursorAtStart === false && this.input().isCursorAtEnd === false;
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
          text: blocks.map((block) => block.content.text).join(this.textField.inline ? " " : "")
        });
      },
      split() {
        var _a, _b;
        const contents = (_b = (_a = this.input()).getSplitContent) == null ? void 0 : _b.call(_a);
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
  var _sfc_render$1 = function render() {
    var _vm = this, _c = _vm._self._c;
    return _c("div", { attrs: { "data-style": _vm.content.style } }, [_c(_vm.component, _vm._b({ ref: "input", tag: "component", staticClass: "k-block-type-text-input", attrs: { "keys": _vm.keys, "value": _vm.content.text }, on: { "input": function($event) {
      return _vm.update({ text: $event });
    } } }, "component", _vm.textField, false))], 1);
  };
  var _sfc_staticRenderFns$1 = [];
  _sfc_render$1._withStripped = true;
  var __component__$1 = /* @__PURE__ */ normalizeComponent(
    _sfc_main$1,
    _sfc_render$1,
    _sfc_staticRenderFns$1,
    false,
    null,
    null,
    null,
    null
  );
  __component__$1.options.__file = "/Users/justuskraft/Server/kirby-blaupause/backend/site/plugins/blaupause-block-previews/src/components/Text.vue";
  const Text = __component__$1.exports;
  const List_vue_vue_type_style_index_0_lang = "";
  const _sfc_main = {
    computed: {
      component() {
        const component = "k-" + this.textField.type + "-input";
        if (this.$helper.isComponent(component)) {
          return component;
        }
        return "k-writer-input";
      },
      isSplitable() {
        return this.content.text.length > 0 && this.input().isCursorAtStart === false && this.input().isCursorAtEnd === false;
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
          text: blocks.map((block) => block.content.text).join(this.textField.inline ? " " : "")
        });
      },
      split() {
        var _a, _b;
        const contents = (_b = (_a = this.input()).getSplitContent) == null ? void 0 : _b.call(_a);
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
  var _sfc_render = function render() {
    var _vm = this, _c = _vm._self._c;
    return _c("div", { attrs: { "data-style": _vm.content.style } }, [_c(_vm.component, _vm._b({ ref: "input", tag: "component", staticClass: "k-block-type-text-input", attrs: { "keys": _vm.keys, "value": _vm.content.text }, on: { "input": function($event) {
      return _vm.update({ text: $event });
    } } }, "component", _vm.textField, false))], 1);
  };
  var _sfc_staticRenderFns = [];
  _sfc_render._withStripped = true;
  var __component__ = /* @__PURE__ */ normalizeComponent(
    _sfc_main,
    _sfc_render,
    _sfc_staticRenderFns,
    false,
    null,
    null,
    null,
    null
  );
  __component__.options.__file = "/Users/justuskraft/Server/kirby-blaupause/backend/site/plugins/blaupause-block-previews/src/components/List.vue";
  const List = __component__.exports;
  window.panel.plugin("femundfilou/blaupause-block-previews", {
    blocks: {
      button: Button,
      heading: Heading,
      text: Text,
      list: List
    }
  });
})();
