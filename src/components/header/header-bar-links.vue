<template>
  <div>
    <b-navbar-nav right>
      <b-nav-item :href="github" right>
        <i class="fab fa-github fa-2x" aria-hidden="true"></i>
      </b-nav-item>
      <b-nav-item :href="twitter" right>
        <i class="fab fa-twitter fa-2x" style="padding-top: 2px" aria-hidden="true"></i>
      </b-nav-item>
      <b-nav-item :href="linkedin" right>
        <i class="fab fa-linkedin fa-2x" aria-hidden="true"></i>
      </b-nav-item>
    </b-navbar-nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      github: "https://github.com/michaelwybraniec",
      twitter: "https://twitter.com/mike_wybraniec",
      linkedin: "https://linkedin.com/in/michaelwybraniec/"
    };
  }
};
</script>
