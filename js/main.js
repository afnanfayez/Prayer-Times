import { clearStorageAndUI, getAndShowCities, getAndShowCountries, getAndShowPrayerTimes, init } from './getAndShowData.js';
import {
  continentSelect,
  countrySelect,
  citySelect,
  resetBtn,
} from './ui.js';

document.addEventListener("DOMContentLoaded", () => {
  init();
  continentSelect.addEventListener("change", async () => {
    await getAndShowCountries();
  });

  countrySelect.addEventListener("change", async () => {
    await getAndShowCities();
  });

  citySelect.addEventListener("change", async () => {
    await getAndShowPrayerTimes();
  });

  resetBtn.addEventListener("click", clearStorageAndUI)

});
