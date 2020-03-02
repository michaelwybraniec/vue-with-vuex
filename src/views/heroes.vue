<template>
  <b-container>
    <div class="mt-4 mb-4 text-center" v-show="message" style="padding-top: 100px">
      <b-spinner type="grow"></b-spinner>
      <p>{{ message }}</p>
    </div>
    <div v-if="!message">
    <fade-transition>
      <b-card-group deck>
        <b-card header="Vue App 4 Peaks" class="shadow">
          <b-row>
            <b-col>
              <div v-if="!selectedHero">
                <!-- <p class="mt-1 text-right">{{APIorJSONDB}}</p> -->
            
                <b-button class="button refresh-button" @click="loadHeroes()">
                 get heroes<i class="fas fa-sync"></i>
                </b-button>

            <!--     <router-link
                  tag="button"
                  class="button add-button"
                  :to="{ name: 'hero-detail', params: { id: 0 } }"
                  >router link
                   <i class="fas fa-plus"></i>
                </router-link> -->

                <b-list-group v-for="(index, hero) in heroes" :hero="hero" :key="hero.id">
                  <b-list-group-item button class="shadow-sm mt-1" @click="selectHero(index)">
                    <b>{{ index.name }}</b>
                    <div class="description">{{ index.description }}</div>
                  </b-list-group-item>
                  
   <!-- <router-link
                    tag="button"
                    class="link card-footer-item"
                    :to="{ name: 'hero-detail', params: { id: hero.name } }"
                  />
                   -->
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
    </div>
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
      selectedHero: undefined,
      //APIorJSONDB: false // this should come from the sotre...
    };
  },
  components: { 
    HeroDetail
  },


  async mounted() {
   await this.loadHeroes();
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
