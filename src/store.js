import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    countries: [],
  },
  mutations: {
    saveCountries(state, countries) {
      state.countries = countries;
    },
  },
  actions: {
    fetchCountries({ commit }) {
      return new Promise((resolve, reject) => {
        fetch(
          "https://restcountries.eu/rest/v2/all?fields=flag;name;nativeName;population;region;subregion;capital;topLevelDomain;currencies;languages;borders;alpha2Code;alpha3Code"
        )
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            const countries = data;

            commit("saveCountries", countries);
            resolve(countries);
          })
          .catch((err) => {
            console.error(err);
            reject(err);
          });
      });
    },
  },
  getters: {
    listCountries: (state) => {
      return state.countries;
    },

    byRegion: (state) => (region) => {
      let countries = state.countries.filter(
        (country) => country.region.toLowerCase() === region
      );

      return countries;
    },

    byName: (state, getters) => (name, region) => {
      let countries = [];

      if (region === "") {
        countries = getters.listCountries;
      } else {
        countries = getters.byRegion(region);
      }

      let list = countries.filter((country) =>
        country.name.toLowerCase().includes(name)
      );

      return list;
    },
  },
});
