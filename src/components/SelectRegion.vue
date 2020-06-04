<template>
  <div>
    <select :value="value" v-on="listeners" class="select">
      <option value="" selected>Filter by Region</option>
      <option value="africa">Africa</option>
      <option value="americas">America</option>
      <option value="asia">Asia</option>
      <option value="europe">Europe</option>
      <option value="oceania">Oceania</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "SelectRegion",
  data() {
    return {};
  },

  props: {
    value: {
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

  methods: {},
};
</script>

<style lang="scss" scoped>
.select {
  padding: 1.24em 2em;
  border: none;
  box-shadow: 1px 2px 5px -2px var(--darkGray);
  border-radius: 5px;
  width: 100%;
  color: var(--darkGray);
  background: white;
  font-size: 14px;
  font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
  font-weight: 600;

  option {
    font-size: 14px;
    font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
    font-weight: 400;
  }

  &:focus {
    outline: none;
  }

  @media screen and (min-width: 1024px) {
    width: 200px;
  }
}
</style>
