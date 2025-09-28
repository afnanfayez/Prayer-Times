import { 
  continentSelect, 
  countrySelect, 
  citySelect, 
  prayerTableBody,
  countryNameEl,
  cityNameEl,
  currentDateEl,
  nextPrayerCountdownEl
} from './ui.js';

import { fetchCountriesByContinent, fetchCitiesByCountry, fetchPrayerTimes } from './api.js';

import { countDown } from './utils.js';

document.addEventListener("DOMContentLoaded", () => {
  // continent changes
  continentSelect.addEventListener("change", async () => {
    const continent = continentSelect.value;

    // Reset country and city selects
    countrySelect.options.length = 1;
    citySelect.options.length = 1;

    if (!continent) return;

    // Fetch countries and fill the select
    const countries = await fetchCountriesByContinent(continent);
    countries.forEach(country => {
      const opt = document.createElement("option");
      opt.value = country;
      opt.textContent = country;
      countrySelect.append(opt);
    });
  });

  // country changes
  countrySelect.addEventListener("change", async () => {
    const country = countrySelect.value;
    citySelect.options.length = 1;

    if (!country) return;

    // Fetch cities and fill the select
    const cities = await fetchCitiesByCountry(country);
    cities.forEach(city => {
      const opt = document.createElement("option");
      opt.value = city;
      opt.textContent = city;
      citySelect.append(opt);
    });
  });

  // When city changes
  citySelect.addEventListener("change", async () => {
    const country = countrySelect.value;
    const city = citySelect.value;

    if (!country || !city) return;

    // Update information-1 section
    countryNameEl.textContent = country;
    cityNameEl.textContent = city;

    const today = new Date();
    const day = today.getDate().toString().padStart(2, "0");
    const month = today.toLocaleString("default", { month: "short" });
    const year = today.getFullYear();
    currentDateEl.textContent = `${day}/${month}/${year}`;

    // Fetch prayer times
    const prayerTimes = await fetchPrayerTimes(city, country);
    console.log("Prayer Times:", prayerTimes);

    // Update prayer table
    const rows = prayerTableBody.querySelectorAll("tr");
    const prayersOrder = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
    rows.forEach(row => {
      const prayerName = row.dataset.prayer;
      const timeCell = row.querySelector(".time");
      timeCell.textContent = prayerTimes[prayerName] || "-";
    });

    // Find the next prayer
    const now = new Date();
    let nextPrayerName = null;
    let nextPrayerTime = null;

    for (let prayer of prayersOrder) {
      if (!prayerTimes[prayer]) continue;

      const [hours, minutes] = prayerTimes[prayer].split(":").map(Number);
      const prayerDate = new Date();
      prayerDate.setHours(hours, minutes, 0, 0);

      if (prayerDate > now) {
        nextPrayerName = prayer;
        nextPrayerTime = prayerDate;
        break;
      }
    }
    // Calculate time remaining
    const diff = nextPrayerTime - now;
const countdown = countDown(diff);

nextPrayerCountdownEl.textContent = `Time remaining for: ${nextPrayerName} in ${countdown}`;
  });

});

