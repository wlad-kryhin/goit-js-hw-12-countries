'use strict';

import countrySearch from './country-url';
import articlesOneCountry from '../template/oneCountry.hbs';
import countryList from '../template/manyCountry.hbs';
import debounce from 'lodash.debounce';
import { info, success, error } from '../../node_modules/@pnotify/core';
import { defaultModules } from '../../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';

  defaultModules.set(PNotifyMobile, {});
  const myError = error({
    text: "No country has been found. Please enter a more specific query!"
  });
  
  const myInfo = info({
    text: "Too many matches found. Please enter a more specific query!"
  });
  const mySuccess = success({
    text: "It's OK."
  });


 const searchForm = document.querySelector('.input-js');
 const articles  = document.querySelector('.js-articles');


searchForm.addEventListener('input', debounce(countrySearchInputHandler, 500));

function countrySearchInputHandler(e) {
  e.preventDefault();
  clearArticlesContainer();
   const searchQuery = e.target.value;
  
  countrySearch.fetchArticles(searchQuery).then(data => {
    
      if (data.length > 10) {
        // handlerSpecificQuery()
        myInfo
      }
       else if (data.status === 404) {
        //  handlerError()
        myError
       }
      else if (data.length === 1) {
        // handlerSuccess()
         mySuccess        
          buildListMarkup(data, articlesOneCountry);
      }
       else if (data.length <= 10) {
         myInfo
          buildListMarkup(data, countryList);
      }
  })
}
// function handlerError(){
//   alert({text : 'No country has been found. Please enter a more specific query!' })
// }
// function handlerSpecificQuery(){
//   alert({text : 'Too many matches found. Please enter a more specific query!'})
// }
// function handlerSuccess(){
//   alert({text : 'SUCCESS YEEEEEEEEEAHH'})
// }

function buildListMarkup(countries, template) {
  const markup = countries.map(count => template(count)).join();
  articles.insertAdjacentHTML('afterbegin', markup)
}

function clearArticlesContainer() {
  articles.innerHTML = ''
}