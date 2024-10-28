import React, { useState } from 'react';
import axios from 'axios';
import EmissionsChart from './EmissionsChart';
import DataTable from './DataTable';
import { Autocomplete, TextField, Button, Box } from '@mui/material';

// Define available country options for the user to select from, including the country code and name
const countryOptions = [
  { code: 'USA', name: 'United States' },
  { code: 'CHN', name: 'China' },
  { code: 'IND', name: 'India' },
  { code: 'DEU', name: 'Germany' },
  { code: 'FRA', name: 'France' },
  // Add more country options as needed
];

const Dashboard: React.FC = () => {
  // State to store the selected countries by the user
  const [selectedCountries, setSelectedCountries] = useState<any[]>([]);
  // State to store the start year entered by the user
  const [startYear, setStartYear] = useState<string>('');
  // State to store the end year entered by the user
  const [endYear, setEndYear] = useState<string>('');
  // State to store the data processed for chart display
  const [chartData, setChartData] = useState<any>(null);
  // State to store the data processed for table display
  const [tableData, setTableData] = useState<any>(null);

  // Function to handle fetching emissions data when the user clicks "Fetch Data"
  const handleFetchData = async () => {
    // Validate if the user has selected countries and entered a valid year range
    if (selectedCountries.length === 0 || !startYear || !endYear) {
      alert('Please select countries and enter a valid year range.');
      return;
    }

    // Join the selected country codes into a comma-separated string
    const countryCodes = selectedCountries.map((country) => country.code).join(',');
    
    try {
      // Make an API request to the backend with the selected countries and year range
      const response = await axios.get(
        `http://localhost:8080/api/emissions?countries=${countryCodes}&start_year=${startYear}&end_year=${endYear}`
      );

      // Process the fetched data into a format suitable for Chart.js
      const processedChartData = processDataForChart(response.data);
      // Process the fetched data into a format suitable for displaying in the table
      const processedTableData = processDataForTable(response.data);

      // Update the state with the processed data for chart and table
      setChartData(processedChartData);
      setTableData(processedTableData);
    } catch (error) {
      // Log any errors encountered during the data fetching process
      console.error('Error fetching emissions data:', error);
    }
  };

  // Function to process the fetched data for Chart.js
  const processDataForChart = (data: any) => {
    // Extract labels (years) from the first country's data
    const labels = data[0].data.map((item: any) => item.year);

    // Create datasets for each country, containing the emissions values for each year
    const datasets = data.map((countryData: any) => ({
      label: countryData.country, // Country name for the dataset label
      data: countryData.data.map((item: any) => item.emissions), // Emissions values for each year
      fill: false,
      borderColor: getRandomColor(), // Assign a random color for each country's line in the chart
      tension: 0.1, // Adjust the line curve tension for smoother lines
    }));

    // Return the formatted chart data
    return { labels, datasets };
  };

  // Function to process the fetched data into a format suitable for the data table
  const processDataForTable = (data: any) => {
    return data.map((countryData: any) => ({
      country: countryData.country,
      data: countryData.data.map((item: any) => ({
        year: item.year,
        emissions: item.emissions,
      })),
    }));
  };

  // Function to generate a random color for each country's line in the chart
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 600, margin: '0 auto' }}>
      {/* Autocomplete for selecting multiple countries */}
      <Autocomplete
        multiple
        options={countryOptions}
        getOptionLabel={(option) => option.name}
        value={selectedCountries}
        onChange={(event, newValue) => setSelectedCountries(newValue)}
        renderInput={(params) => <TextField {...params} label="Select Countries" variant="outlined" />}
      />
      {/* Input field for entering the start year */}
      <TextField
        label="Start Year"
        variant="outlined"
        value={startYear}
        onChange={(e) => setStartYear(e.target.value)}
        type="number"
        fullWidth
      />
      {/* Input field for entering the end year */}
      <TextField
        label="End Year"
        variant="outlined"
        value={endYear}
        onChange={(e) => setEndYear(e.target.value)}
        type="number"
        fullWidth
      />
      {/* Button to fetch data based on the selected countries and year range */}
      <Button variant="contained" onClick={handleFetchData}>
        Fetch Data
      </Button>

      {/* Render the chart if chartData is available */}
      {chartData && (
        <>
          <h2>Carbon Emissions Chart</h2>
          <EmissionsChart chartData={chartData} />
        </>
      )}
      
      {/* Render the data table if tableData is available */}
      {tableData && (
        <>
          <h2>Carbon Emissions Data Table</h2>
          <DataTable data={tableData} />
        </>
      )}
    </Box>
  );
};

export default Dashboard;
