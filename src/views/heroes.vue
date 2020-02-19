<template>
  <b-container>
    <div class="mt-4 mb-4 text-center" v-show="message" style="padding-top: 200px">
      <b-spinner type="grow"></b-spinner>
      <p>{{ message }}</p>
    </div>
    <fade-transition>
      <b-card-group deck v-if="heroes.length > 0">
        <b-card header="Vue App 4 Peaks" class="shadow">
          <b-row>
            <b-col>
              <div v-if="!selectedHero">
                <p class="mt-1 text-right">{{APIorJSONDB}}</p>
                <p
                  class="mt-1 text-right"
                >Current Page: {{ currentPage }}, People: {{heroes.length}}</p>
          
                <b-pagination v-model="currentPage" :total-rows="50" align="right"></b-pagination>
              
                <b-list-group v-for="(index, hero) in heroes" :hero="hero" :key="hero.id">
                  <b-list-group-item button class="shadow-sm mt-1" @click="selectHero(index)">
                    <b>{{ index.name }}</b>
                    <div class="description">{{ index.description }}</div>
                  </b-list-group-item>
                </b-list-group>
              </div>
              <HeroDetail
                :hero="selectedHero"
                @save="saveHero"
                @cancel="cancelHero"
                v-if="selectedHero"
              />
            </b-col>
          </b-row>
        </b-card>
      </b-card-group>
    </fade-transition>
  </b-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import HeroDetail from "@/views/hero-detail";
export default {
  name: "Heroes",
  data() {
    return {
      message: "",
      selectedHero: {},
      APIorJSONDB: false
    };
  },
  components: { 
    HeroDetail
  },

  async created() {
   await this.loadHeroes();
  },
  async mounted() {
    this.setFirstPage();
  },
  watch: {
    currentPage: function() {
    console.log(this.currentPage);
    this.heroes = this.chunkedPeople[this.currentPage - 1];
    }
  },
  methods: {
     ...mapActions(['getHeroesAction']),
     async loadHeroes() {
      this.message = 'Getting the heroes, please be patient';
      await this.getHeroesAction();
      this.message = '';
    },
    
    cancelHero() {
      this.selectedHero = !this.selectedHero;
    },
    saveHero(hero) {
      const index = this.heroes.findIndex(p => p.id === hero.id);
      this.heroes.splice(index, 1, hero);
      this.heroes = [...this.heroes];
      this.selectedHero = undefined;
    },
    selectHero(hero) {
      this.selectedHero = hero;
    },
    setFirstPage() {
      this.currentPage = 1;
    }
  },
  computed: {
    ...mapState(['heroes']),
  }
};
</script>
