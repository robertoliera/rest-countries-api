<template>
  <div class="header">
    <div class="wrapper">
      <div class="container-flex">
        <h2>Where is the world?</h2>
        <p>
          <font-awesome-icon :icon="['far', 'moon']" class="icon-moon" />Dark
          Mode
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderBar",
};
</script>

<style lang="scss" scoped>
.header {
  box-shadow: 1px 2px 5px -2px var(--darkGray);
}

.container-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .icon-moon {
    margin-right: 0.5em;
  }
}
h2 {
  font-size: 1em;
  font-weight: 700;
}

p {
  font-size: 1em;
  font-weight: 600;
}
</style>
