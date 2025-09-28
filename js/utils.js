import { PRAYER_ORDER } from './constants.js';
import { methodSelect, nextPrayerCountdownEl } from './ui.js';
export function countDown(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const secs = String(totalSeconds % 60).padStart(2, "0");
  return `${hrs}:${mins}:${secs}`;
}

export function setItemInStorage(key, value = "") {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getItemFromStorage(key) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}


export function getNextPrayer(prayerTimes) {
  const now = new Date();
  for (let prayer of PRAYER_ORDER) {
    if (!prayerTimes[prayer]) continue;

    const [hours, minutes] = prayerTimes[prayer].split(":").map(Number);
    const prayerDate = new Date();
    prayerDate.setHours(hours, minutes, 0, 0);

    if (prayerDate > now) {
      return { name: prayer, time: prayerDate }
    }
  }
}

export function startCountDown(nextPrayer) {
  if (nextPrayer.time) {
    if (window.nextPrayerInterval) {
      clearInterval(window.nextPrayerInterval);
    }

    window.nextPrayerInterval = setInterval(() => {
      const now = new Date();
      const diff = nextPrayer.time - now;

      if (diff <= 0) {
        clearInterval(window.nextPrayerInterval);
        nextPrayerCountdownEl.textContent = `${nextPrayer.name} time has started`;
        return;
      }

      const countdown = countDown(diff);
      const methodText = methodSelect.options[methodSelect.selectedIndex].text;
      nextPrayerCountdownEl.textContent = `Time remaining for: ${nextPrayer.name} in ${countdown} - ${methodText.toLowerCase() == "select a method" ? "Muslim World League" : methodText}`;
    }, 1000);
  }
}

