'use strict'
const baseUrl = 'https://restcountries.eu/rest/v2/name/';


export default {
   async fetchArticles(query) {
    const fetchArt = await fetch(baseUrl + query).then(res => res.json());
    return fetchArt
  },
};