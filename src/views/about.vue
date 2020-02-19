<template>
  <div>
    <b-container>
      <fade-transition>
        <div v-show="show">
          <b-row class="mt-4" style="padding-top: 20px">
            <b-col md="5" class="text-right">
              <b-img
                src="https://media-exp1.licdn.com/dms/image/C5603AQFdGmGD1WjfZw/profile-displayphoto-shrink_200_200/0?e=1585785600&v=beta&t=kpR6bN1nw4L-UUfmrZ9UIzLBUQvxDpUWKGN1ZRBS_aQ"
                rounded="circle"
              ></b-img>
            </b-col>
            <b-col md="7">
              <b-card-body title="Hello!" style="padding-top: 55px;">
                <b-card-text>This is a demo VueJS app proptotyped with codesandbox.io</b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </div>
      </fade-transition>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "about",
  data() {
    return {
      show: false
    };
  },
  created() {
    setTimeout(() => {
      this.toogle();
    }, 200);
  },
  methods: {
    toogle() {
      this.show = !this.show;
    }
  }
};
</script>

