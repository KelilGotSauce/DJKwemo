import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { apiFetch } from "./api";
import SearchableSelect from "./components/SearchableSelect";

export default function ClaimSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get("session_id");

  const [name, setName] = useState("");
  const [social, setSocial] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadCountries();
  }, []);

  useEffect(() => {
    if (country) {
      loadCities(country);
    } else {
      setCities([]);
      setCity("");
    }
  }, [country]);

  const selectedCountry = useMemo(() => {
    return countries.find((item) => item.name === country) || null;
  }, [countries, country]);

  const loadCountries = async () => {
    try {
      setLoadingCountries(true);
      const data = await apiFetch("/api/locations/countries");
      setCountries(data.countries || []);
    } catch (error) {
      console.error("Failed to load countries:", error.message);
      setMessage("Could not load countries.");
    } finally {
      setLoadingCountries(false);
    }
  };

  const loadCities = async (selectedCountry) => {
    try {
      setLoadingCities(true);
      const data = await apiFetch(
        `/api/locations/cities?country=${encodeURIComponent(selectedCountry)}`
      );
      setCities(data.cities || []);
      setCity("");
    } catch (error) {
      console.error("Failed to load cities:", error.message);
      setCities([]);
      setMessage("Could not load cities.");
    } finally {
      setLoadingCities(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/leaderboard/claim`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            sessionId,
            name,
            social,
            country,
            city,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        navigate(
          `/claim-complete?rank=${data.believer.rank}&name=${encodeURIComponent(
            data.believer.name
          )}`
        );
      } else {
        setMessage(data.message || data.error || "Could not create believer");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong.");
    }
  };

  if (!sessionId) {
    return (
      <main style={{ padding: "32px" }}>
        <h1>Missing session ID</h1>
      </main>
    );
  }

  return (
    <main style={{ padding: "32px" }}>
      <h1>Complete Your Believer Profile</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: "420px" }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Social media link"
          value={social}
          onChange={(e) => setSocial(e.target.value)}
          style={inputStyle}
        />

        <SearchableSelect
        label="Country"
        placeholder={loadingCountries ? "Loading countries..." : "Type your country"}
        options={countries}
        value={country}
        onChange={(value) => setCountry(value)}
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.name}
        disabled={loadingCountries}
        selectedIcon={
            selectedCountry?.flag ? (
            <img
                src={selectedCountry.flag}
                alt={`${selectedCountry.name} flag`}
                width="20"
                height="14"
                style={{ objectFit: "cover", border: "1px solid #ddd" }}
            />
            ) : null
        }
        renderOption={(option) => (
            <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
            }}
            >
            {option.flag && (
                <img
                src={option.flag}
                alt={`${option.name} flag`}
                width="20"
                height="14"
                style={{ objectFit: "cover", border: "1px solid #ddd" }}
                />
            )}
            <span>{option.name}</span>
            </div>
        )}
        />

        <SearchableSelect
          label="City"
          placeholder={
            !country
              ? "Select a country first"
              : loadingCities
              ? "Loading cities..."
              : "Type your city"
          }
          options={cities}
          value={city}
          onChange={(value) => setCity(value)}
          disabled={!country || loadingCities}
        />

        <button type="submit" disabled={!country || !city}>
          Claim My Spot
        </button>
      </form>

      {message && <p style={{ marginTop: "12px", color: "red" }}>{message}</p>}
    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  boxSizing: "border-box",
};