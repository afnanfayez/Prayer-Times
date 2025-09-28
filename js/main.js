import { fetchCountriesByContinent, fetchCitiesByCountry, fetchPrayerTimes } from './api.js'; 
import { continentSelect, countrySelect, citySelect,prayerTableBody} from './ui.js';

document.addEventListener("DOMContentLoaded", () => {

  continentSelect.addEventListener("change", async () => {
    const continent = continentSelect.value;

    countrySelect.options.length = 1;
    citySelect.options.length = 1;

    if (!continent) return;

    const countries = await fetchCountriesByContinent(continent);
    countries.forEach(country => {
      const opt = document.createElement("option");
      opt.value = country;
      opt.textContent = country;
      countrySelect.append(opt);
    });
  });


  countrySelect.addEventListener("change", async () => {
    const country = countrySelect.value;
    citySelect.options.length = 1;

    if (!country) return;

    const cities = await fetchCitiesByCountry(country);
    cities.forEach(city => {
      const opt = document.createElement("option");
      opt.value = city;
      opt.textContent = city;
      citySelect.append(opt);
    });
  });

  citySelect.addEventListener("change", async () => {
    const country = countrySelect.value;
    const city = citySelect.value;

    if (!country || !city) return;

    const prayerTimes = await fetchPrayerTimes(city, country);
    console.log("Prayer Times:", prayerTimes);
    const rows = prayerTableBody.querySelectorAll("tr");
    rows.forEach(row => {
        const prayerName = row.dataset.prayer;
        const timeCell = row.querySelector(".time");
        timeCell.textContent = prayerTimes[prayerName] || "-";
    });
});

});
