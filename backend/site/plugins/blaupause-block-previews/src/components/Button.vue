<template>
  <input :class="['button', `is-${content.style}`]" :data-alignment="content.alignment" type="text"
    :placeholder="placeholder" :value="content.text" @input="update({ text: $event.target.value })" />
</template>

<script>
export default {};
</script>

<style>
.k-block-type-button {
  display: flex;
}
</style>
<style scoped>
.button {
  appearance: none;
  background: var(--clea-button-background-color);
  border: var(--clea-button-border-width) solid var(--clea-button-border-color);
  border-radius: var(--clea-border-radius);
  color: var(--clea-button-color-invert);
  cursor: pointer;
  display: inline-block;
  font-family: var(--clea-font-family);
  font-weight: var(--clea-font-weight-bold);
  line-height: var(--clea-line-height);
  outline: none;
  padding: var(--clea-button-padding-y) var(--clea-button-padding-x);
  text-align: center;
  text-decoration: none;
  transition: background 0.2s, border 0.2s, box-shadow 0.2s, color 0.2s,
    transform 0.1s;
  user-select: none;
  vertical-align: middle;
  width: auto;
  white-space: nowrap;
}

.button.is-text {
  background-color: transparent;
  color: var(--clea-button-color);
  border: 0;
  padding: 0;
  font-weight: var(--clea-font-weight-normal);
}

.button:focus,
.button:hover {
  background: var(--clea-button-background-color-invert);
  border-color: var(--clea-button-bordr-color-invert);
  color: var(--clea-button-color);
  text-decoration: none;
}

.button[data-alignment="left"] {
  margin-right: auto;
}

.button[data-alignment="centered"] {
  margin-inline: auto;
}

.button[data-alignment="right"] {
  margin-left: auto;
}
</style>
