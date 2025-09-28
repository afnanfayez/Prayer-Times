export async function fetchCountriesByContinent(continent) {
  const url = `https://restcountries.com/v3.1/region/${continent}`;

  try {
    const response = await fetch(url);

    if (response.status !== 200) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const countries = await response.json();

    if (!countries?.length) {
      throw new Error("No countries found");
    }

    console.log("Countries fetched successfully");
    return countries.map(c => c.name.common);

  } catch (error) {
    console.error("Error fetching countries:", error.message);
    return [];
  }
}


export async function fetchCitiesByCountry(country) {
  const url = "https://countriesnow.space/api/v0.1/countries/cities";

  try {
    console.log(`Fetching cities for country: ${country}...`);
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country }),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    if (!data?.data?.length) {
      throw new Error("No cities found for this country");
    }

    console.log("Cities fetched successfully ");
    return data.data;
  } catch (error) {
    console.error("Error fetching cities:", error.message);
    return [];
  }
}

export async function fetchPrayerTimes(country, city, method = 4) {
  const url = `https://api.aladhan.com/v1/timingsByCity?country=${country}&city=${city}&method=${method == "default" ? 3 : method}`;

  try {
    console.log("Fetching prayer times...");
    const response = await fetch(url);

    if (response.status !== 200) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    if (!data.data) throw new Error("No data found");

    console.log("Prayer times fetched successfully ");
    return data.data.timings;
  } catch (error) {
    console.error("Error fetching prayer times:", error.message);
    return null;
  }
}

