import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';

const _ = require('lodash');
const DEBOUNCE_DELAY = 300;
export const countryInput = document.querySelector('#search-box');
countryInput.addEventListener('input', _.debounce(() => {
    fetchCountries(countryInput.value.trim());
}, DEBOUNCE_DELAY, {
    'leading': false,
    'trailing': true
}));