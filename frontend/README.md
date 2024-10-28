
# Carbon Emissions Dashboard - Frontend

This is the frontend part of the Carbon Emissions Dashboard, a React application that allows users to compare CO2 emissions between countries over a specified date range.

## Overview

The frontend is built with **React** and **TypeScript**, using **Material UI** for the user interface components and **Chart.js** for data visualization. Users can select countries and a date range, and view the resulting CO2 emissions data in a chart and a table.

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run the Application**:
   - Start the React development server:
     ```bash
     npm start
     ```
   - Open `http://localhost:3000` in your browser to access the application.

3. **Run Tests**:
   - To run frontend tests, use:
     ```bash
     npm test
     ```

## Key Features

- **Country Selection**: Select multiple countries from a dropdown menu using Material UI's Autocomplete component.
- **Year Range Input**: Specify a start and end year for viewing emissions data.
- **Data Visualization**: Displays CO2 emissions data in a line chart using Chart.js.
- **Data Table**: View detailed emissions data in a tabular format with Material UI's Table components.
- **Error Handling**: User-friendly error messages are displayed for invalid inputs or API errors.

## Project Structure

```
src/
├── App.tsx                # Main entry point for the application
├── components/
│   ├── Dashboard.tsx      # Main component for user interaction and data display
│   ├── EmissionsChart.tsx # Component for displaying the emissions data in a chart
│   ├── DataTable.tsx      # Component for displaying the emissions data in a table
│   └── ...                # Additional components and utility files
├── index.tsx              # ReactDOM rendering
├── setupTests.ts          # Jest setup for testing environment
└── ...                    # Other configurations and assets
```

## Dependencies

- **react**: JavaScript library for building user interfaces.
- **@mui/material**: Material UI components for building a responsive user interface.
- **chart.js** & **react-chartjs-2**: Library for rendering charts.
- **axios**: For making HTTP requests to the backend API.

## Notes

- The frontend interacts with the backend at `http://localhost:3001` by default to fetch CO2 emissions data.
- Ensure the backend is running before using the frontend to fetch data.