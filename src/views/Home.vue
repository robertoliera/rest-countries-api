<template>
  <div>
    <HeaderBar></HeaderBar>

    <div class="wrapper">
      <div class="filters">
        <InputSearch
          v-model="search"
          placeholder="Search for a country"
          @input="filterByName"
        ></InputSearch>

        <SelectRegion v-model="region" @change="filterByRegion"></SelectRegion>
      </div>

      <div class="grid">
        <CountryItem
          v-for="country in countries"
          :key="country.id"
          :country="country"
        >
        </CountryItem>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from "@/components/HeaderBar";
import InputSearch from "@/components/InputSearch";
import SelectRegion from "@/components/SelectRegion";
import CountryItem from "@/components/CountryItem";
export default {
  name: "Home",
  components: {
    HeaderBar,
    InputSearch,
    SelectRegion,
    CountryItem,
  },

  data() {
    return {
      countries: [],
      region: "",
      search: "",
    };
  },

  created() {
    this.fetchCountries();
  },

  methods: {
    fetchCountries() {
      this.$store
        .dispatch("fetchCountries")
        .then((resp) => (this.countries = JSON.parse(JSON.stringify(resp))))
        .catch((err) => {
          console.log("err", err);
        });
    },

    filterByRegion() {
      const listCountries = this.$store.getters.listCountries;
      const countriesByRegion = this.$store.getters.byRegion(this.region);
      const countriesByName = this.$store.getters.byName(
        this.search,
        this.region
      );

      if (this.region !== "" && this.search.length === 0) {
        this.countries = countriesByRegion;
        return false;
      }

      if (this.search.length > 0) {
        this.countries = countriesByName;
        return false;
      }

      this.countries = listCountries;
    },

    filterByName() {
      this.countries = this.$store.getters.byName(this.search, this.region);
    },
  },

  filters: {
    amount(value) {
      let quantity = new Intl.NumberFormat().format(value);
      return quantity;
    },
  },
};
</script>

<style lang="scss" scoped>
.filters {
  padding: 2em 0;
  > div {
    display: block;
    &:first-child {
      margin-bottom: 2em;
    }
  }
}
.grid {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 3em;
  padding: 2em;
}

@media screen and (min-width: 1024px) {
  .filters {
    padding: 2em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div {
      &:first-child {
        margin: 0;
      }
    }
  }
  .grid {
    grid-template-columns: repeat(4, 1fr);
    column-gap: 75px;
    row-gap: 75px;
  }
}
</style>
