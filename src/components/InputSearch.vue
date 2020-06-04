<template>
  <div>
    <input
      class="input"
      type="text"
      :value="value"
      :placeholder="placeholder"
      v-on="listeners"
    />
  </div>
</template>

<script>
export default {
  name: "InputSearch",

  props: {
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },

  computed: {
    listeners() {
      return {
        // Pass all component listeners directly to input
        ...this.$listeners,
        // Override input listener to work with v-model
        input: (event) => this.$emit("input", event.target.value),
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  padding: 1.5em 2em;
  background: white;
  width: 100%;
  box-shadow: 1px 2px 5px -2px var(--darkGray);
  box-sizing: border-box;
  border-radius: 5px;
  border: none;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 14px;
    font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
    font-weight: 600;
  }

  @media screen and (min-width: 1024px) {
    width: 450px;
  }
}
</style>
