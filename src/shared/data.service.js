import axios from "axios";
import { format } from "date-fns";
import { inputDateFormat } from "./constants";
import { db } from "./data";
import { API } from "./config";

const getHeroes = async () => {
  let apiKey = "apikey=c57d263f5e59e2805cebe38c6f1f63c0";
  let url = "https://gateway.marvel.com:443/v1/public/characters?" + apiKey;
  const requestOptions = {
    method: "GET",
    format: "json",
    api_key: apiKey
  };
  return axios(url, requestOptions)
    .then(response => {
      let data = parseList(response);
      console.log("data.service: getHeroes: response", data);
      return data.data.results;
    })
    .catch(error => {
      console.error(error);
      return db.data;
    });
};

const getHero = async function(id) {
  try {
    const response = await axios.get(`${API}/heroes/${id}`);
    let hero = parseItem(response, 200);
    hero.fullName = `${hero.firstName} ${hero.lastName}`;
    return hero;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const updateHero = async function(hero) {
  try {
    const response = await axios.put(`${API}/heroes/${hero.id}`, hero);
    const updatedHero = parseItem(response, 200);
    return updatedHero;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const parseList = response => {
  if (response.status !== 200) throw Error(response.message);
  if (!response.data) return [];
  let list = response.data;
  if (typeof list !== "object") {
    list = [];
  }
  return list;
};

export const parseItem = (response, code) => {
  if (response.status !== code) throw Error(response.message);
  let item = response.data;
  if (typeof item !== "object") {
    item = undefined;
  }
  return item;
};

export const dataService = {
  getHero,
  getHeroes,
  updateHero
};
