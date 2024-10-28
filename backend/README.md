# Carbon Emissions Dashboard - Backend

This is an Express-based backend service that provides CO2 emissions data for multiple countries over a specified date range, using the World Bank Climate Data API.

## Overview

The backend is built with **Express** and **TypeScript**. It provides a RESTful API that fetches emissions data from the World Bank API, processes it, and returns it in a format suitable for frontend consumption.

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Setup**:
   - Create a `.env` file in the root directory with the following content:
     ```
     PORT=3001
     ```
   - The server will run on `http://localhost:3001` by default.

3. **Run the Server**:
   - Start the backend server using `npx nodemon`:
     ```bash
     npx nodemon src/index.ts
     ```
   - The API will be accessible at `http://localhost:3001`.

4. **Run Tests**:
   - To run tests, use:
     ```bash
     npm test
     ```

## API Documentation

### GET /api/emissions

- **Description**: Fetches CO2 emissions data for specified countries and a date range.
- **Endpoint**: `/api/emissions`
- **Method**: `GET`
- **Query Parameters**:
  - `countries` (string): Comma-separated country codes (e.g., `USA,CHN,IND`).
  - `start_year` (string): Start year for the data range (e.g., `2010`).
  - `end_year` (string): End year for the data range (e.g., `2020`).
- **Example Request**:
  ```
  GET /api/emissions?countries=USA,CHN&start_year=2010&end_year=2019
  ```
- **Response**:
  - `200 OK`: Returns an array of objects containing emissions data for each country.
  - `400 Bad Request`: Missing query parameters.
  - `500 Internal Server Error`: Error fetching data from the World Bank API or server errors.
- **Example Response**:
  ```json
  [
    {
      "country": "USA",
      "data": [
        { "year": "2010", "emissions": 5000 },
        { "year": "2011", "emissions": 5200 }
      ]
    },
    {
      "country": "CHN",
      "data": [
        { "year": "2010", "emissions": 8000 },
        { "year": "2011", "emissions": 8500 }
      ]
    }
  ]
  ```

## Error Handling

- Handles missing query parameters by returning a `400` status with an appropriate error message.
- Logs errors and returns `500` for unexpected server errors or issues with the World Bank API.
- Includes detailed error logging for debugging purposes.

## Dependencies

- **express**: Fast, unopinionated, minimalist web framework for Node.js.
- **axios**: Promise-based HTTP client for making API requests.
- **cors**: Middleware to enable Cross-Origin Resource Sharing.
- **nodemon**: Utility that automatically restarts the server when file changes are detected (for development).

## Notes

- The World Bank API is used for fetching CO2 emissions data with the indicator code `EN.GHG.CO2.IP.MT.CE.AR5`.