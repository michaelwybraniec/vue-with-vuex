<template>
  <b-container>
    <div class="mt-4 mb-4 text-center" v-show="message" style="padding-top: 200px">
      <b-spinner type="grow"></b-spinner>
      <p>{{ message }}</p>
    </div>
    <fade-transition>
      <b-card-group deck v-if="people.length > 0">
        <b-card header="Vue App 4 Peaks" class="shadow">
          <b-row>
            <b-col>
              <div v-if="!selectedPerson">
                <p class="mt-1 text-right">{{APIorJSONDB}}</p>
                <p
                  class="mt-1 text-right"
                >Current Page: {{ currentPage }}, People: {{people.length}}</p>
          
                <b-pagination v-model="currentPage" :total-rows="50" align="right"></b-pagination>
              
                <b-list-group v-for="(index, person) in people" :person="person" :key="person.id">
                  <b-list-group-item button class="shadow-sm mt-1" @click="selectPerson(index)">
                    <b>{{ index.name }}</b>
                    <div class="description">{{ index.description }}</div>
                  </b-list-group-item>
                </b-list-group>
              </div>
              <PersonDetail
                :person="selectedPerson"
                @save="savePerson"
                @cancel="cancelPerson"
                v-if="selectedPerson"
              />
            </b-col>
          </b-row>
        </b-card>
      </b-card-group>
    </fade-transition>
  </b-container>
</template>

<script>
import axios from "axios";
import jsonDB from "../../../db.json";
import PersonDetail from "@/views/person-detail";

//let exampleIems = [...Array(150).keys()].map(i => ({ id: (i+1), name: 'Item ' + (i+1) }));
       
export default {
  name: "People",
  data() {
    return {
      apiKey: "apikey=c57d263f5e59e2805cebe38c6f1f63c0",
      apiUrl: "https://gateway.marvel.com/v1/public/characters?",
      APIorJSONDB: "",
      people: [],
      clonedPeople:[],
      peopleIfNoApi: jsonDB.data,
      chunkedPeople: [],
      selectedPerson: undefined,
      message: "",
      sliceNbr: 0,
      perPage: 5,
      currentPage: 1,
   
    };
  },
  components: {
    PersonDetail
  },
  async mounted() {
    await this.loadPeople();
    this.setFirstPage();
  },
  watch: {
    currentPage: function() {
      console.log(this.currentPage);
      this.people = this.chunkedPeople[this.currentPage - 1];
    }
  },
  methods: {
     loadPeople() {
      this.message = "Getting the heroes...";
      //await this.getPeopleAction();
      //TODO: Move this method to user.service.js,
      //TODO: so it is in the storage called once not each time when we load component
      const url = this.apiUrl + this.apiKey;
      const requestOptions = {
        method: "GET",
        format: "json",
        api_key: this.apiKey
      };
       axios(url, requestOptions)
        .then(response => {
          this.people = response.data.data.results; 
          this.clonedPoeple = response.data.data.results;
          const clonedPeople = [...this.people]
          console.log(clonedPeople.length)
             let index = 0;
          for (index = 0; index < this.people.length; index += 7) {
            let myChunk = clonedPeople.slice(index, index + 7);
            this.chunkedPeople.push(myChunk);
          }
          console.log(this.chunkedPeople);
          this.APIorJSONDB = "Connected to API.";
          this.message = "";
        })
        .catch(err => {
          console.log("Catch err msg:", err);
          this.people = this.peopleIfNoApi;
          const clonedPeople = this.people;
          let index = 0;
          for (index = 0; index < this.people.length; index += 7) {
            let myChunk = clonedPeople.slice(index, index + 7);
            this.chunkedPeople.push(myChunk);
          }
         
          this.people = this.people.slice(0, 7);
          this.APIorJSONDB = "API not available: db.json has been loaded.";
          this.message = "";
        });
    },
    cancelPerson() {
      this.selectedPerson = !this.selectedPerson;
    },
    savePerson(person) {
      const index = this.people.findIndex(p => p.id === person.id);
      this.people.splice(index, 1, person);
      this.people = [...this.people];
      this.selectedPerson = undefined;
    },
    selectPerson(person) {
      this.selectedPerson = person;
    },
    setFirstPage() {
      this.currentPage = 1;
    }
  },
  computed: {
  }
};
</script>
