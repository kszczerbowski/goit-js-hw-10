import Notiflix from "notiflix";
import { countryInput } from '../index';

const countryList = document.querySelector('.country-list');
const countryDiv = document.querySelector('.country-info');

export function fetchCountries(name) {
    countryDiv.innerHTML='';
    countryList.innerHTML = '';
    if (countryInput.value !== '') {
        fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
        .then(response => {
            if (!response.ok) {
            throw new Error(response.status);
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 1) {
                countryDiv.innerHTML = `<img src="${data[0].flags.svg}" alt="flag" width="30">
                <h1>${data[0].name.official}</h1><br>
                <h3>Capital: </h3><span>${data[0].capital}</span><br>
                <h3>Population: </h3><span>${data[0].population}</span><br>
                <h3>Languages: </h3><span>${Object.values(data[0].languages).join(', ')}</span>`
                }
            if (data.length >= 2 && data.length <= 10) {
                countryList.innerHTML = data.map(element => {
                    return `<li>
                    <img src="${element.flags.svg}" alt="flag" width="40">
                    <span>${element.name.official}</span>
                    </li>`
                }).join('');
            }
            if (data.length > 10) Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        })
        .catch(error => {
            if (error.message == '404') Notiflix.Notify.failure('Oops, there is no country with that name');
        });
    }
}