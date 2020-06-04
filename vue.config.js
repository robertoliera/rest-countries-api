module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/rest-countries-api/" : "/",
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "@/scss/styles.scss";
        `,
      },
    },
  },
};
