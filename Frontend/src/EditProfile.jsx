import { useEffect, useMemo, useState } from "react";
import { User } from "lucide-react";
import { apiFetch } from "./api";
import SearchableSelect from "./components/SearchableSelect";
import "./neuromorphic/styles/editprofile.css";

const socialIconMap = {
  twitter: {
    src: "twitter.png",
    className: "profile-social-icon profile-social-twitter",
    alt: "Twitter",
  },
  instagram: {
    src: "instagram.png",
    className: "profile-social-icon profile-social-instagram",
    alt: "Instagram",
  },
  youtube: {
    src: "youtube.png",
    className: "profile-social-icon profile-social-youtube",
    alt: "YouTube",
  },
};

export default function EditProfile() {
  const [form, setForm] = useState({
    name: "",
    country: "",
    city: "",
    youtube: "",
    twitter: "",
    instagram: "",
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
          country: data.believer.country || "",
          city: data.believer.city || "",
          youtube: data.believer.youtube || "",
          twitter: data.believer.twitter || "",
          instagram: data.believer.instagram || "",
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
    <main className="edit-profile-page">
      <article className="neu-card glass-panel faq-card edit-profile-card">
        <h1 className="neu-card-title edit-profile-title">Edit Profile</h1>

        <form onSubmit={handleSubmit} className="edit-profile-form">
          <div className="accordion-list edit-profile-list">
            <InputRow
              icon={<User size={18} />}
              placeholder="Name"
              name="name"
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />

            <div className="accordion-item neu-flat profile-select-accordion">
              <div className="profile-select-inner">
                <div className="profile-field-control">
                  <SearchableSelect
                    label=""
                    placeholder={
                      loadingCountries ? "Loading countries..." : "Country"
                    }
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
                          style={{
                            objectFit: "cover",
                            border: "1px solid rgba(255,255,255,0.12)",
                            borderRadius: "4px",
                          }}
                        />
                      ) : null
                    }
                    renderOption={(option) => (
                      <div className="country-option-row">
                        {option.flag && (
                          <img
                            src={option.flag}
                            alt={`${option.name} flag`}
                            width="20"
                            height="14"
                            style={{
                              objectFit: "cover",
                              border: "1px solid rgba(255,255,255,0.12)",
                              borderRadius: "4px",
                            }}
                          />
                        )}
                        <span>{option.name}</span>
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="accordion-item neu-flat profile-select-accordion">
              <div className="profile-select-inner">
                <div className="profile-field-control">
                  <SearchableSelect
                    label=""
                    placeholder={
                      !form.country
                        ? "Select a country first"
                        : loadingCities
                        ? "Loading cities..."
                        : "City"
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
                    getOptionLabel={(option) =>
                      typeof option === "string" ? option : option?.name || ""
                    }
                    getOptionValue={(option) =>
                      typeof option === "string" ? option : option?.name || ""
                    }
                    renderOption={(option) => {
                      const label =
                        typeof option === "string"
                          ? option
                          : option?.name || "";
                      return (
                        <div className="country-option-row">
                          <span>{label}</span>
                        </div>
                      );
                    }}
                  />
                </div>
              </div>
            </div>

            <SocialInputRow
              socialKey="youtube"
              placeholder="YouTube link or @handle"
              value={form.youtube}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, youtube: e.target.value }))
              }
            />

            <SocialInputRow
              socialKey="twitter"
              placeholder="Twitter / X link or @handle"
              value={form.twitter}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, twitter: e.target.value }))
              }
            />

            <SocialInputRow
              socialKey="instagram"
              placeholder="Instagram link or @handle"
              value={form.instagram}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, instagram: e.target.value }))
              }
            />
          </div>

          <button
            type="submit"
            className="edit-profile-save-btn neu-focus"
            disabled={!form.name || !form.country || !form.city}
          >
            <span>Save Changes</span>
          </button>
        </form>

        {message && <p className="edit-profile-message">{message}</p>}
        {error && <p className="edit-profile-error">{error}</p>}
      </article>
    </main>
  );
}

function InputRow({
  icon,
  placeholder,
  name,
  value,
  onChange,
  required = false,
}) {
  return (
    <div className="accordion-item neu-flat profile-row">
      <div className="profile-field-shell">
        <div className="profile-field-icon">{icon}</div>

        <input
          className="profile-input"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
      </div>
    </div>
  );
}

function SocialInputRow({ socialKey, placeholder, value, onChange }) {
  const icon = socialIconMap[socialKey];

  return (
    <div className="accordion-item neu-flat profile-row">
      <div className="profile-field-shell">
        <div className="profile-field-icon profile-field-icon-image">
          <img src={icon.src} alt={icon.alt} className={icon.className} />
        </div>

        <input
          className="profile-input"
          name={socialKey}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}