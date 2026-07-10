// Icone meteo animate (Meteocons), mappate sui codici icona di OpenWeather
import i01d from "@bybas/weather-icons/production/fill/openweathermap/01d.svg";
import i01n from "@bybas/weather-icons/production/fill/openweathermap/01n.svg";
import i02d from "@bybas/weather-icons/production/fill/openweathermap/02d.svg";
import i02n from "@bybas/weather-icons/production/fill/openweathermap/02n.svg";
import i03d from "@bybas/weather-icons/production/fill/openweathermap/03d.svg";
import i03n from "@bybas/weather-icons/production/fill/openweathermap/03n.svg";
import i04d from "@bybas/weather-icons/production/fill/openweathermap/04d.svg";
import i04n from "@bybas/weather-icons/production/fill/openweathermap/04n.svg";
import i09d from "@bybas/weather-icons/production/fill/openweathermap/09d.svg";
import i09n from "@bybas/weather-icons/production/fill/openweathermap/09n.svg";
import i10d from "@bybas/weather-icons/production/fill/openweathermap/10d.svg";
import i10n from "@bybas/weather-icons/production/fill/openweathermap/10n.svg";
import i11d from "@bybas/weather-icons/production/fill/openweathermap/11d.svg";
import i11n from "@bybas/weather-icons/production/fill/openweathermap/11n.svg";
import i13d from "@bybas/weather-icons/production/fill/openweathermap/13d.svg";
import i13n from "@bybas/weather-icons/production/fill/openweathermap/13n.svg";
import i50d from "@bybas/weather-icons/production/fill/openweathermap/50d.svg";
import i50n from "@bybas/weather-icons/production/fill/openweathermap/50n.svg";

const iconeMeteo = {
  "01d": i01d,
  "01n": i01n,
  "02d": i02d,
  "02n": i02n,
  "03d": i03d,
  "03n": i03n,
  "04d": i04d,
  "04n": i04n,
  "09d": i09d,
  "09n": i09n,
  "10d": i10d,
  "10n": i10n,
  "11d": i11d,
  "11n": i11n,
  "13d": i13d,
  "13n": i13n,
  "50d": i50d,
  "50n": i50n,
};

export function urlIconaMeteo(codice) {
  return iconeMeteo[codice] ?? iconeMeteo["03d"];
}
