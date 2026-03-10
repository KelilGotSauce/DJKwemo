const CITY_OVERRIDES = {
  Montreal: "MTL",
  Toronto: "TOR",
  Vancouver: "VAN",
  "New York": "NYC",
  London: "LDN",
  Tokyo: "TKY",
  Paris: "PAR",
  Shanghai: "SHA",
  Sydney: "SYD",
  "São Paulo": "SAO",
  "Los Angeles": "LA",
  Chicago: "CHI",
};

const COUNTRY_CODES = {
  Canada: "CA",
  "United States": "US",
  USA: "US",

  China: "CN",
  Japan: "JP",

  France: "FR",
  Brazil: "BR",
  Australia: "AU",

  UK: "GB",
  "United Kingdom": "GB",

  Germany: "DE",
  Italy: "IT",
  Spain: "ES",
  Mexico: "MX",
  India: "IN",

  Nigeria: "NG",
  Morocco: "MA",
  Algeria: "DZ",
  Tunisia: "TN",
  Senegal: "SN",
  Cameroon: "CM",

  Switzerland: "CH",
  Netherlands: "NL",
  "South Korea": "KR",
};

function countryCodeToFlag(code) {
  if (!code || code.length !== 2) return "";
  return code
    .toUpperCase()
    .replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt())
    );
}

function formatCityCode(city) {
  if (!city) return "";

  if (CITY_OVERRIDES[city]) {
    return CITY_OVERRIDES[city];
  }

  const cleaned = city
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z\s]/g, "")
    .trim();

  if (!cleaned) return "";

  const words = cleaned.split(/\s+/);

  if (words.length === 1) {
    return words[0].slice(0, 3).toUpperCase();
  }

  if (words.length === 2) {
    return (words[0][0] + words[1].slice(0, 2)).toUpperCase();
  }

  return words
    .slice(0, 3)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function formatCountryCode(country) {
  if (!country) return "";

  const cleanedCountry = country
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\s]/gu, "")
    .trim();

  return COUNTRY_CODES[cleanedCountry] || cleanedCountry.slice(0, 2).toUpperCase();
}

export function formatLocation(city, country) {
  const cityCode = formatCityCode(city);
  const countryCode = formatCountryCode(country);
  const flag = countryCodeToFlag(countryCode);

  return [cityCode, countryCode].filter(Boolean).join(", ") + (flag ? ` ${flag}` : "");
}