export const continentSelect = document.getElementById("continent");
export const countrySelect = document.getElementById("country");
export const citySelect = document.getElementById("city");
export const methodSelect = document.getElementById("method");
export const prayerTableBody = document.querySelector("#prayerTableBody");

export const countryNameEl = document.querySelector("#countryName");
export const cityNameEl = document.querySelector("#cityName");
export const currentDateEl = document.querySelector("#currentDate");
export const nextPrayerCountdownEl = document.querySelector("#nextPrayerCountdown");
export const resetBtn = document.querySelector("#reset");


export function showCountries(countries) {
    countries.forEach(country => {
        const opt = document.createElement("option");
        opt.value = country;
        opt.textContent = country;
        countrySelect.append(opt);
    });
}

export function showCities(cities) {
    cities.forEach(city => {
        const opt = document.createElement("option");
        opt.value = city;
        opt.textContent = city;
        citySelect.append(opt);
    });
}

export function updatePrayerTable(prayerTimes) {
    const rows = prayerTableBody.querySelectorAll("tr");
    rows.forEach(row => {
        const prayerName = row.dataset.prayer;
        const timeCell = row.querySelector(".time");
        timeCell.textContent = prayerTimes[prayerName] || "-";
    });
}

export function setCurrentTime() {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, "0");
    const month = today.toLocaleString("default", { month: "short" });
    const year = today.getFullYear();
    currentDateEl.textContent = `${day}/${month}/${year}`;
}