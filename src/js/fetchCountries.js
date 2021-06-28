'use strict';

import countrySearch from './country-url';
import articlesOneCountry from '../template/oneCountry.hbs';
import countryList from '../template/manyCountry.hbs';
import debounce from 'lodash.debounce';
import { alert, defaultModules } from '../../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';

  defaultModules.set(PNotifyMobile, {});
  


 const searchForm = document.querySelector('.input-js');
 const articles  = document.querySelector('.js-articles');


searchForm.addEventListener('input', debounce(countrySearchInputHandler, 500));

function countrySearchInputHandler(e) {
  e.preventDefault();
  clearArticlesContainer();
   const searchQuery = e.target.value;
  
  countrySearch.fetchArticles(searchQuery).then(data => {
    
      if (data.length > 10) {
          alert({text : 'Too many matches found. Please enter a more specific query!'})
      }
       else if (data.status === 404) {
    alert('No country has been found. Please enter a more specific query!');
      } 
      else if (data.length === 1) {
        alert('SUCCESS YEEEEEEEEEAHH')
          buildListMarkup(data, articlesOneCountry);
      }
       else if (data.length <= 10) {
          buildListMarkup(data, countryList);
      }
  })
}

function buildListMarkup(countries, template) {
  const markup = countries.map(count => template(count)).join();
  articles.insertAdjacentHTML('afterbegin', markup)
}

function clearArticlesContainer() {
  articles.innerHTML = ''
}