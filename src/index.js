import './css/styles.css';
var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import api from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const ul = document.querySelector('.country-list');
const div = document.querySelector('.country-info');
const li = document.querySelector('li')


function render(e) {
   // console.log(input.value.length)
    ul.innerHTML = ""
    div.innerHTML = ""
    api.fetchCountries(input.value)
        .then((value) => {
            return value.json()
        }
        )
        .then((value) => {
            if (value.length >= 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
            }
            else if (value.length >= 2 && value.length < 10) {
                const all = value.map((e) => {
                    ul.insertAdjacentHTML('afterbegin',
                        `<li class = "list-item" >
                   <img src = ${e.flags.svg} width = 30 height = 20>
                    ${e.name.official}
                    </li>
                    `.trim())
                    // while (div.firstChild) {
                    //     div.removeChild(div.firstChild);
                    // }
                })
            }
            else {
                const all = value.map((e) => {
                    div.innerHTML =
                        `<div class = "first_string"><img src = ${e.flags.svg} width = 30 height = 20> 
                            <p>${e.name.official}</p>
                         </div>   
                            <p> Capital: ${e.capital}</p>
                            <p> Population: ${e.population}</p>
                           <p> Languages: ${Object.values(e.languages).join(", ")}</p>
                          `.trim()
                    // while (ul.firstChild) {
                    //     ul.removeChild(ul.firstChild);
                    // }
                })
           
                
            }
                
        })
        .catch((error) => {
            Notiflix.Notify.failure('Oops, there is no country with that name')
        })
}

input.addEventListener('input', debounce(render , DEBOUNCE_DELAY));
