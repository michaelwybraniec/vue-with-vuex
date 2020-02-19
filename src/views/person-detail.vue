<template>
  <b-container>
    <b-card class="mt-4 mb-4 shadow-sm p-4">
      <b-row>
        <b-col>
          <b-row class="my-1 mb-2 text-center">
            <b-col>
              <div style="height: 120px">
                <div
                  class="text-center"
                  style="padding-top: 40px;"
                  v-if="!picLoaded"
                  v-show="message"
                >
                  <b-spinner type="grow"></b-spinner>
                  <p>{{ message }}</p>
                </div>
                <div v-if="picLoaded">
                  <b-img :src="pic" v-bind="mainProps" rounded="circle" fluid alt="img"></b-img>
                </div>
              </div>
              <p>
                <b>{{clonedPerson.name}}</b>
                : {{clonedPerson.description}}
              </p>
              <p>
                ( ID:
                <code>{{ clonedPerson.id }}</code> )
              </p>
            </b-col>
          </b-row>

          <b-row class="my-1">
            <b-col sm="2">
              <label for="name">Name:</label>
            </b-col>
            <b-col sm="10">
              <b-form-input id="name" v-model="clonedPerson.name"></b-form-input>
            </b-col>
          </b-row>

          <b-row>
            <b-col sm="2">
              <label for="description">Description:</label>
            </b-col>
            <b-col sm="10">
              <b-form-input id="description" v-model="clonedPerson.description"></b-form-input>
            </b-col>
          </b-row>

          <div v-if="comicses.length > 0">
            <div class="text-center pt-4">Comics found: {{clonedPerson.comics.items.length}}</div>
            <div class="text-center pt-2 pb-2">First 3:</div>
            <div :key="comics.name" v-for="(comics, index) in comicses">
              <b-row class="my-1" v-if="index < 3">
                <b-col sm="2">
                  <label>{{index + 1}}:</label>
                </b-col>
                <b-col sm="10" style="padding-left: 15px">{{comics.name}} ({{comics.name}})</b-col>
              </b-row>
            </div>
          </div>

          <b-row class="text-center">
            <b-col v-show="messageNoComics" class="m-4" style="padding-top: 57px;">
              <code>{{ messageNoComics }}</code>
            </b-col>

            <b-col v-show="message4comics" class="m-4" style="padding-top: 20px;">
              <b-spinner type="grow"></b-spinner>
              <p>{{ message4comics }}</p>
            </b-col>
          </b-row>

          <div class="float-right mt-4">
            <b-button class="mr-2" variant="light" @click="cancelPerson()">Cancel</b-button>
            <b-button variant="light" @click="savePerson()">Save</b-button>
          </div>
        </b-col>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
import { data } from "../shared";

export default {
  name: "PersonDetail",
  props: {
    id: {
      type: Number,
      default: 0
    },
    person: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      clonedPerson: { ...this.person }, // to avoid obj mutation.
      message: "",
      message4comics: "",
      messageNoComics: "",
      picLoaded: undefined,
      pic: "",
      comicses: [],
      mainProps: {
        center: true,
        width: 100,
        height: 100
      }
    };
  },
  computed: {
    fullName() {
      //return this.person ? `${this.person.firstName} ${this.person.lastName}` : '';
      return this.clonedPerson
        ? this.clonedPerson.name + this.clonedPerson.description
        : "";
    }
  },
  async mounted() {
    await this.loadPics();
    await this.loadComics();
  },
  methods: {
    async loadPics() {
      this.message = "Loading photo...";
      this.pic =
        this.clonedPerson.thumbnail.path +
        "." +
        this.clonedPerson.thumbnail.extention;
      console.log(
        "methods(), loadPics(), this.clonedPerson.name",
        this.clonedPerson.name
      );
      let pics = await data.getPics();
      // path: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
      this.pic = pics[Math.floor(Math.random() * pics.length)].url;
      if (this.pic) {
        this.picLoaded = true;
        this.message = "";
      } else this.message = "Err.";
    },
    async loadComics() {
      this.message4comics = "And now getting comics info...";
      setTimeout(() => {
        this.comicses = this.clonedPerson.comics.items;
        console.log(
          "All comics available:",
          this.clonedPerson.comics.items.length
        );
        if (this.clonedPerson.comics.items.length === 0) {
          this.messageNoComics = "No commics available :-(";
        } else {
          this.messageNoComics = "";
        }
        this.message4comics = "";
      }, 1000);
    },
    cancelPerson() {
      this.$emit("cancel");
    },
    async savePerson() {
      this.$emit("save", this.clonedPerson);
    }
  }
};
</script>
