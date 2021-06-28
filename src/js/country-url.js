'use strict'
const baseUrl = 'https://restcountries.eu/rest/v2/name/';


export default {
  fetchArticles(query) {
    return fetch(baseUrl + query).then(res => res.json());
  },
};