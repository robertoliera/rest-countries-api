<template>
  <div>
    <div class="item" @click="goToCountryPage(country.alpha2Code)">
      <div class="item__image">
        <img loading="lazy" :src="country.flag" :alt="country.name" />
      </div>
      <div class="item__content">
        <h3>{{ country.name }}</h3>

        <p><span>Population:</span> {{ country.population | amount }}</p>
        <p><span>Region:</span> {{ country.region }}</p>
        <p><span>Capital:</span> {{ country.capital }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CountryItem",
  props: {
    country: Object,
  },

  methods: {
    goToCountryPage(id) {
      this.$router.push({
        name: "CountryPage",
        params: {
          id: id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
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

  &__content {
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

@media screen and (min-width: 1024px) {
  .item {
    img {
      height: 160px;
      width: 100%;
      object-fit: cover;
    }
  }
}
</style>
