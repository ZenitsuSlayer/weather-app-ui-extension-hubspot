# WeatherCard App for HubSpot

WeatherCard is a private HubSpot CRM extension that displays real-time weather insights for contacts using a custom CRM card and a serverless backend integration.  

**User Story:**  
As a sales or support representative, I want to see the current weather for a contact's city directly in their CRM record, so I can personalize my outreach and build rapport.

**Rationale:**  
Weather is a universal topic and can be a great conversation starter. By surfacing local weather data in the CRM, reps can tailor their communication and create more engaging, relevant interactions with contacts.

---

## One-Click Setup

1. **Clone the repository**
   ```sh
   git clone https://github.com/ZenitsuSlayer/weather-app-ui-extension-hubspot.git
   cd weather-app-ui-extension
   ```

2. **Install dependencies for extensions and functions**
   ```sh
   cd src/app/extensions
   npm install
   cd ../app.functions
   npm install
   cd ../../..
   ```

3. **Set up your authentication key**
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api) and obtain a free API key.
   - In `src/app/app.functions/.env`, replace the value of `OPENWEATHER_API_KEY` with your API key:
     ```
     OPENWEATHER_API_KEY="your_openweather_api_key_here"
     ```

4. **Start the HubSpot project in development mode**
   ```sh
   hs project dev
   ```

---

## 🔑 Authentication Keys

- This extension requires an OpenWeatherMap API key to fetch weather data.
- The key is stored securely in the serverless function's `.env` file and referenced in [`serverless.json`](src/app/app.functions/serverless.json).
- Never commit your real API key to a public repository.

---

## 📦 Project Structure

- `src/app/extensions/WeatherCard.jsx` – React CRM card UI for weather display.
- `src/app/app.functions/getWeather.js` – Serverless function to fetch weather data.
- `src/app/app.functions/.env` – Store your OpenWeatherMap API key here.
- `src/app/extensions/weather-card.json` – CRM card extension manifest.
- `src/app/app.json` – App manifest and configuration.
- `src/app/webhooks/webhooks.json` – Example webhook subscriptions.

---

## 📝 Notes

- This project is intended for use with the [HubSpot CLI](https://www.npmjs.com/package/@hubspot/cli) and a HubSpot developer account.
- All dependencies are managed via `npm` in their respective directories.

---

For more information, see the HubSpot [developer documentation](https://developers.hubspot.com/docs/)
