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
        <div
          v-for="country in countries"
          :key="country.id"
          @click="goToCountryPage(country.alpha2Code)"
          class="grid__item"
        >
          <div class="grid__image">
            <img :src="country.flag" :alt="country.name" />
          </div>
          <div class="grid__content">
            <h3>{{ country.name }}</h3>

            <p><span>Population:</span> {{ country.population | amount }}</p>
            <p><span>Region:</span> {{ country.region }}</p>
            <p><span>Capital:</span> {{ country.capital }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from "@/components/HeaderBar";
import InputSearch from "@/components/InputSearch";
import SelectRegion from "@/components/SelectRegion";
export default {
  name: "Home",
  components: {
    HeaderBar,
    InputSearch,
    SelectRegion,
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

    goToCountryPage(id) {
      this.$router.push({
        name: "CountryPage",
        params: {
          id: id,
        },
      });
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
  &__item {
    box-shadow: 1px 2px 5px -2px var(--darkGray);
    border-radius: 5px;
    background: white;
    cursor: pointer;

    img {
      max-width: 100%;
      border-radius: 5px 5px 0 0;
      height: 200px;
      object-fit: cover;
    }

    .grid__content {
      padding: 1em 2em 3.5em;
      h3 {
        margin: 0 0 1em 0;
      }
      p {
        margin: 0.2em 0;
        span {
          font-weight: 600;
        }
      }
    }
  }
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
    &__item {
      img {
        height: 160px;
        width: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
