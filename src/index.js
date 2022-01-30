import './css/styles.css';
var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import api from './fetchCountries';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set,child, get } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import { remove } from 'lodash';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const ul = document.querySelector('.country-list');
const div = document.querySelector('.country-info');
// const li = document.querySelector('li');
const favourite = document.querySelector('#favourite');
const ulFav = document.querySelector('.your__favourite-list');
const del = document.querySelector('.button__delete');



const firebaseConfig = {
 apiKey: "AIzaSyDckDQPuDCdpiyhbjevM2NF4pgM8hjIon8",
  authDomain: "hw11-a61a1.firebaseapp.com",
  projectId: "hw11-a61a1",
  storageBucket: "hw11-a61a1.appspot.com",
  messagingSenderId: "370417607812",
  appId: "1:370417607812:web:34e59e7fce4fd300dd4ed1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
function renderFav(e,props) {
    api.fetchCountries(input.value)
        .then((value) => {
            return value.json()
        }
        )
        .then((value) => {
            if (value.length === 1) {
                    const all = value.map((e) => {
                       ulFav.insertAdjacentHTML('afterbegin',
                        `<li class = "list-item" >
                          <button class = "button__delete">
                    delete</button>
                   <img src = ${e.flags.svg} width = 30 height = 20>
                    <p class = "list-text">${e.name.official}</p>
                  
                    </li>
                    `.trim())
                        props = e;
                        console.log(props)
                        writeUserData(props)
                })
            }
            else { 

                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
            }
        })
}
function writeUserData(props) {
        const db = getDatabase();
        set(ref(db, 'users/' + uuidv4()), {
            props: props,
        
        });
        }
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
function delet() { 
    remove()
};



function constructor(status, email, password){
        this.email = email;
    this.password = password;
    this.status = status
};
  
 function  createUser(email, password) {
    const auth = getAuth();
     createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(userCredential, user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
  }

  async function signUserInAccount(email, password) {
    const auth = getAuth();
     signInWithEmailAndPassword(auth, email, password).then((result) => {
        this.status = 'Ok';
        console.log(result.user);
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
    });
  }










favourite.addEventListener('click', renderFav);
input.addEventListener('input', debounce(render, DEBOUNCE_DELAY));
del.addEventListener('click',delet)