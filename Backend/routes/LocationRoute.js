import express from "express";

const router = express.Router();

const normalizeCities = (cities) => {
  const seen = new Set();

  return cities
    .map((city) => city.trim())
    .filter((city) => city.length > 0)
    .filter((city) => {
      const key = city.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => a.localeCompare(b));
};

// Get countries with flags
router.get("/countries", async (req, res) => {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags"
    );

    const data = await response.json();

    const countries = data
      .map((country) => ({
        name: country?.name?.common || "",
        flag: country?.flags?.svg || country?.flags?.png || "",
      }))
      .filter((country) => country.name)
      .sort((a, b) => a.name.localeCompare(b.name));

    res.json({ countries });
  } catch (error) {
    console.error("countries error:", error);
    res.status(500).json({ error: "Failed to load countries" });
  }
});

// Get cities for selected country
router.get("/cities", async (req, res) => {
  try {
    const { country } = req.query;

    if (!country) {
      return res.status(400).json({ error: "Country required" });
    }

    const response = await fetch(
      "https://countriesnow.space/api/v0.1/countries/cities",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ country }),
      }
    );

    const data = await response.json();

    const rawCities = Array.isArray(data.data) ? data.data : [];
    const cities = normalizeCities(rawCities);

    res.json({ cities });
  } catch (error) {
    console.error("cities error:", error);
    res.status(500).json({ error: "Failed to load cities" });
  }
});

export default router;