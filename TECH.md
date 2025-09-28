## Prayer Times Technical Requirements

The app is a single-page application (SPA), Vanilla JavaScript App that allows users to select a continent, country, and city to view Islamic prayer times.  
It displays only the 5 daily prayers (Fajr, Dhuhr, Asr, Maghrib, Isha) in a clean table, shows a live countdown for the next prayer, and supports multiple calculation methods.

---

## Folder Structure

- `index.html` – the main structure of the app.  
- `style.css` – the style of the app (responsive design).  
- `/js/api.js` – handles API requests (fetching countries, cities, and prayer times).  
- `/js/ui.js` – handles DOM manipulation (rendering selects, table, countdown),contains API URLs and constants.
- `/js/utils.js` – contains helper functions (time formatting, countdown logic, caching).  
- `/js/main.js` – main logic of the app (event listeners, app initialization).  

---

## Requirements

1. A form with **4 dropdowns**:
   - The form consists of:
     - **Continent** select: options → Africa, Americas, Asia, Europe, Oceania.  
     - **Country** select: dynamically loaded based on continent (via REST Countries API).  
     - **City** select: dynamically loaded based on selected country (via CountriesNow API).  
     - **Calculation Method** select: list of methods from Aladhan API.  
   - Each select should show a **loading state** when fetching data.
   - Selections are required before fetching prayer times.

2. Display a **table** with exactly 5 rows for daily prayers:
   - Fajr  
   - Dhuhr  
   - Asr  
   - Maghrib  
   - Isha  

3. Display a **Next Prayer Banner**:
   - Shows the **next prayer name**.  
   - Shows a **live countdown** (HH:MM:SS) updated every second.  
   - Shows the **exact time** of the next prayer with “today” or “tomorrow”.

4. Handle API calls:
   - Use **Aladhan API** for prayer times.  
   - Use **REST Countries API** for countries by continent.  
   - Use **CountriesNow API** for cities by country.  
   - Implement **caching** for city lists to reduce API calls.

5. Implement **localStorage**:
   - Save the last selected continent, country, city, and method.  
   - Restore saved selections and prayer times on reload.  
   - Provide a **Reset** button to clear selections and storage.

6. Error handling:
   - Show a friendly message if:
     - API fails  
     - City is invalid  
     - User didn’t complete all selections  

7. Responsive and clean design:
   - Mobile-first layout  
   - Clear typography  
   - Use icons for prayers (e.g., via Font Awesome)

8. Code structure:
   - Use **ES6 modules** (import/export).  
   - Keep functions small, reusable, and well-separated.  
   - Avoid global variables (use modular state management).


