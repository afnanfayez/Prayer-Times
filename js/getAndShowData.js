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
resetPrayerTimes,
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

    if (!continent || continent === "default") {

        const placeholder = document.createElement("option");
        placeholder.textContent = "Select a continent first";
        placeholder.disabled = true;
        placeholder.selected = true;
        countrySelect.appendChild(placeholder);

        citySelect.options.length = 1;
        const cityPlaceholder = document.createElement("option");
        cityPlaceholder.textContent = "Select a country first";
        cityPlaceholder.disabled = true;
        cityPlaceholder.selected = true;
        citySelect.appendChild(cityPlaceholder);

        return;
    }

    const loadingOption = document.createElement("option");
    loadingOption.textContent = "Loading countries...";
    loadingOption.classList.add("LoadingCountry");
    countrySelect.appendChild(loadingOption);

    try {
        const countries = await fetchCountriesByContinent(continent);
        showCountries(countries);
        resetPrayerTimes();
    } catch (err) {
        const loading = document.querySelector(".LoadingCountry");
        if (loading) loading.textContent = "Error loading countries";
        console.error(err);
    }
}

export async function getAndShowCities() {
    country = countrySelect.value;
    setItemInStorage("country", country);
    setItemInStorage("city");

    citySelect.options.length = 1;

    if (!country || country === "default") {
        const placeholder = document.createElement("option");
        placeholder.textContent = "Select a country first";
        placeholder.disabled = true;
        citySelect.appendChild(placeholder);
        return;
    }
    const loadingOptionCity = document.createElement("option");
    loadingOptionCity.textContent = "Loading cities...";
    loadingOptionCity.classList.add("LoadingCity");
    citySelect.appendChild(loadingOptionCity);

    try {
        const cities = await fetchCitiesByCountry(country);

        if (!cities.length) {
            const loadingCity = document.querySelector(".LoadingCity");
            if (loadingCity) loadingCity.textContent = "No cities found";
            return;
        }

        showCities(cities);
        resetPrayerTimes();
    } catch (err) {
        const loadingCity = document.querySelector(".LoadingCity");
        if (loadingCity) loadingCity.textContent = "Error loading cities";
        console.error(err);
    }
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