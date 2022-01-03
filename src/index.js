import './css/styles.css';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const ul = document.querySelector('.country-list');
const div = document.querySelector('.country-info');



function render() {
    if (input.value.length > 0 && input.value.length < 4) {
        renderLi()
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
    }
    else {
        renderDiv()
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
}
;        
    }
}

function renderLi() { 
    document.body.append(ul)
    ul.insertAdjacentHTML('afterbegin',
    `<li>
    ${input.value}
    </li>`)
    
}
function renderDiv() { 
    document.body.append(div)
    div.innerHTML =
    `<p>
    ${input.value}
    </p>`
}



input.addEventListener('input', debounce(render , DEBOUNCE_DELAY));
