import {
    continentSelect,
    countrySelect,
    citySelect,
    countryNameEl,
    cityNameEl,
    showCountries,
    showCities,
    setCurrentTime,
    updatePrayerTable,
    methodSelect,
} from './ui.js';
import { fetchCountriesByContinent, fetchCitiesByCountry, fetchPrayerTimes } from './api.js';
import { getItemFromStorage, getNextPrayer, setItemInStorage, startCountDown } from './utils.js';

let continent = getItemFromStorage("continent") || "default";
let country = getItemFromStorage("country") || "default";
let city = getItemFromStorage("city") || "default";
let method = getItemFromStorage("method") || "default";
export async function init() {
    continentSelect.value = continent;
    await getAndShowCountries();
    countrySelect.value = country;
    await getAndShowCities();
    citySelect.value = city;
    methodSelect.value = method;
    await getAndShowPrayerTimes();
}

export async function getAndShowCountries() {
    continent = continentSelect.value;
    setItemInStorage("continent", continent);
    setItemInStorage("country");
    setItemInStorage("city");
    countrySelect.options.length = 1;
    citySelect.options.length = 1;

    if (!continent || continent === "default") return;

    const countries = await fetchCountriesByContinent(continent);
    showCountries(countries);

}

export async function getAndShowCities() {
    country = countrySelect.value;
    setItemInStorage("country", country);
    setItemInStorage("city");
    citySelect.options.length = 1;

    if (!country || country === "default") return;

    const cities = await fetchCitiesByCountry(country);
    showCities(cities);
}

export async function getAndShowPrayerTimes() {
    city = citySelect.value;
    method = methodSelect.value;
    setItemInStorage("city", city);
    if (!country || !city || city === "default" || country === "default") return;

    countryNameEl.textContent = country;
    cityNameEl.textContent = city;

    setCurrentTime();

    const prayerTimes = await fetchPrayerTimes(city, country, method || 3);
    console.log("Prayer Times:", prayerTimes);

    updatePrayerTable(prayerTimes);

    let nextPrayer = getNextPrayer(prayerTimes);
    startCountDown(nextPrayer);
}


export function clearStorageAndUI() {
    localStorage.clear();
    window.location.reload();

}