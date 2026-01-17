const API_KEY = 'AHAPQWV6EJSE3F4XTAS5F8MNU';
const BASE_URL =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

export async function getWeather(location, unit = 'metric') {
  const url = `${BASE_URL}/${encodeURIComponent(location)}?unitGroup=${
    unit === 'imperial' ? 'us' : 'metric'
  }&key=${API_KEY}&contentType=json`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
