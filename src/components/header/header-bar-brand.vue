<template>
  <div>
    <b-navbar-nav right>
      <b-nav-item :href="vue">
        <i class="fab js-logo fa-vuejs fa-2x" aria-hidden="true"/>
      </b-nav-item>
    </b-navbar-nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vue: "https://vuejs.org/"
    };
  }
};
</script>
