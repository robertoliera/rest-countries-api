import Header from '@/components/Header';
<template>
  <div class="country">
    <HeaderBar></HeaderBar>

    <div class="wrapper">
      <button class="btn" @click="goToHome">
        <font-awesome-icon
          :icon="['fa', 'long-arrow-alt-left']"
          class="icon-arrow-left"
        />
        Back
      </button>

      <div class="country__content">
        <img class="country__flag" :src="country.flag" alt="" />

        <div>
          <h3 class="country__name">{{ country.name }}</h3>
          <div class="country__grid">
            <div class="country__primary">
              <p><span>Native Name:</span> {{ country.nativeName }}</p>
              <p><span>Population:</span> {{ country.population | amount }}</p>
              <p><span>Region:</span> {{ country.region }}</p>
              <p><span>Sub Region:</span> {{ country.subregion }}</p>
              <p><span>Capital:</span> {{ country.capital }}</p>
            </div>

            <div class="country__second">
              <p>
                <span class="title">Top Level Domain: </span
                >{{ country.topLevelDomain ? country.topLevelDomain[0] : "" }}
              </p>
              <p>
                <span class="title">Currencies: </span>
                <span
                  v-for="(currency, index) in country.currencies"
                  :key="index"
                >
                  {{ currency.name }}
                  <span v-if="index !== country.currencies.length - 1">,</span>
                </span>
              </p>
              <p>
                <span class="title">Languages: </span>
                <span v-for="(lang, index) in country.languages" :key="index">
                  {{ lang.name
                  }}<span v-if="index !== country.languages.length - 1">,</span>
                </span>
              </p>
            </div>
          </div>

          <div class="country__borders">
            <p class="title">Border Countries:</p>
            <div class="grid">
              <button v-for="(border, index) in borders" :key="index">
                {{ border.name }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from "@/components/HeaderBar";
export default {
  components: {
    HeaderBar,
  },

  data() {
    return {
      country: {},
      borders: [],
    };
  },

  created() {
    this.fetchCountry();
  },

  methods: {
    fetchCountry() {
      const id = this.$route.params.id;
      fetch("https://restcountries.eu/rest/v2/alpha/" + id)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          let countries = this.$store.getters.listCountries;

          //get names of countries based in alpha3code
          data.borders.forEach((border) => {
            countries.filter((country) => {
              if (country.alpha3Code == border) {
                this.borders.push(country);
              }
            });
          });

          this.country = data;
        })
        .catch((err) => {
          console.error(err);
        });
    },

    goToHome() {
      this.$router.push({
        name: "Home",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.country {
  margin-bottom: 3em;
  .btn {
    background: white;
    box-shadow: 1px 2px 7px 1px var(--darkGray);
    padding: 0.5em 2em;
    font-size: 1em;
    font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
    font-weight: 600;
    margin-top: 2em;
    margin-bottom: 4em;
    border: 0;
    cursor: pointer;
  }
  .icon-arrow-left {
    margin-right: 5px;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr;
  }

  &__flag {
    max-width: 100%;
  }
  &__name {
    margin-top: 2em;
    font-size: 1.5em;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 3em;
  }
  &__primary {
    p {
      font-size: 16px;
      margin: 0 0 0.7em;
      span {
        font-weight: 600;
      }
    }
  }

  &__second {
    p {
      font-size: 16px;
      margin: 0 0 0.7em;
      .title {
        font-weight: 600;
      }
    }
  }

  &__borders {
    .title {
      font-size: 18px;
      font-weight: 600;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      column-gap: 10px;
      row-gap: 10px;
    }
    button {
      background: white;
      border: 0;
      border-radius: 5px;
      min-width: 80px;
      padding: 1em;
      box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 5px;
    }
  }
}

@media screen and (min-width: 1024px) {
  .country {
    &__content {
      grid-template-columns: repeat(2, 1fr);
      column-gap: 100px;
    }

    &__name {
      margin-top: 1em;
    }

    &__grid {
      grid-template-columns: 1fr 1fr;
    }

    &__borders {
      .grid {
        grid-template-columns: repeat(3, 200px);
      }
    }
  }
}
</style>
