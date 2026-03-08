import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "./api";
import SearchableSelect from "./components/SearchableSelect";

export default function EditProfile() {
  const [form, setForm] = useState({
    name: "",
    social: "",
    country: "",
    city: "",
  });

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadCountries();
    loadUser();
  }, []);

  useEffect(() => {
    if (form.country) {
      loadCities(form.country);
    } else {
      setCities([]);
      setForm((prev) => ({ ...prev, city: "" }));
    }
  }, [form.country]);

  const selectedCountry = useMemo(() => {
    return countries.find((item) => item.name === form.country) || null;
  }, [countries, form.country]);

  const loadCountries = async () => {
    try {
      setLoadingCountries(true);
      const data = await apiFetch("/api/locations/countries");
      setCountries(data.countries || []);
    } catch (err) {
      console.error("Failed to load countries:", err.message);
    } finally {
      setLoadingCountries(false);
    }
  };

  const loadCities = async (country) => {
    try {
      setLoadingCities(true);
      const data = await apiFetch(
        `/api/locations/cities?country=${encodeURIComponent(country)}`
      );
      setCities(data.cities || []);
    } catch (err) {
      console.error("Failed to load cities:", err.message);
      setCities([]);
    } finally {
      setLoadingCities(false);
    }
  };

  const loadUser = async () => {
    try {
      const data = await apiFetch("/api/auth/me");

      if (data.believer) {
        setForm({
          name: data.believer.name || "",
          social: data.believer.social || "",
          country: data.believer.country || "",
          city: data.believer.city || "",
        });
      }
    } catch (err) {
      setError("Please log in first.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await apiFetch("/api/leaderboard/me", {
        method: "PATCH",
        body: JSON.stringify(form),
      });

    window.location.href = "/";

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main style={{ padding: "32px" }}>
      <h1>Edit Believer Profile</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: "420px" }}>
        <input
          name="name"
          value={form.name}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Name"
          required
          style={inputStyle}
        />

        <input
          name="social"
          value={form.social}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, social: e.target.value }))
          }
          placeholder="Social media"
          style={inputStyle}
        />

        <SearchableSelect
        label="Country"
        placeholder={loadingCountries ? "Loading countries..." : "Type your country"}
        options={countries}
        value={form.country}
        onChange={(value) =>
            setForm((prev) => ({
            ...prev,
            country: value,
            city: "",
            }))
        }
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
            !form.country
              ? "Select a country first"
              : loadingCities
              ? "Loading cities..."
              : "Type your city"
          }
          options={cities}
          value={form.city}
          onChange={(value) =>
            setForm((prev) => ({
              ...prev,
              city: value,
            }))
          }
          disabled={!form.country || loadingCities}
        />

        <button type="submit" disabled={!form.country || !form.city}>
          Save Changes
        </button>
      </form>

      {message && <p>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  boxSizing: "border-box",
};