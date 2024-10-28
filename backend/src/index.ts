import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';

// Create an instance of Express application
const app = express();
export default app;
// Set the port number. Use environment variable PORT if available, otherwise default to 8080
const PORT = process.env.PORT || 3001;

// Enable Cross-Origin Resource Sharing (CORS) to allow requests from different origins
app.use(cors());

// Define a basic route to check if the server is running
app.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});

// Define an API endpoint to fetch emissions data
app.get('/api/emissions', async (req: Request, res: Response): Promise<void> => {
  const { countries, start_year, end_year } = req.query;

  if (!countries || !start_year || !end_year) {
    res.status(400).json({ error: 'Missing query parameters. Please provide countries, start_year, and end_year.' });
    return;
  }

  // Split the comma-separated country codes into an array
  const countryList = (countries as string).split(',');

  try {
    // Fetch emissions data for each country concurrently using Promise.all
    const results = await Promise.all(
      countryList.map(async (country) => {
        // Construct the World Bank API URL with the specified parameters
        const url = `https://api.worldbank.org/v2/country/${country}/indicator/EN.GHG.CO2.IP.MT.CE.AR5?date=${start_year}:${end_year}&format=json`;
        console.log(`Fetching data for country ${country} with URL: ${url}`);

        // Make a GET request to the World Bank API using Axios
        const response = await axios.get(url, {
          headers: {
            'User-Agent': 'CarbonEmissionsApp/1.0', // Add a User-Agent header to the request for better API handling
          },
        });

        // Parse and filter the data:
        // - Check if the response contains the expected data array (response.data[1])
        // - Filter out entries where the emissions value is null
        // - Map each valid entry to an object with 'year' and 'emissions' properties
        const data = response.data[1] && Array.isArray(response.data[1])
          ? response.data[1].filter((entry: any) => entry.value !== null).map((entry: any) => ({
              year: entry.date,
              emissions: entry.value,
            }))
          : [];

        // Log a warning if no valid data is found for the specified range
        if (data.length === 0) {
          console.warn(`No valid data available for ${country} from ${start_year} to ${end_year}.`);
        } else {
          // Log the parsed data for debugging purposes
          console.log(`Data for ${country}:`, JSON.stringify(data, null, 2));
        }

        return {
          country,
          data,
        };
      })
    );

    // Send the aggregated data as a JSON response to the client
    res.json(results);
  } catch (error) {
    // Handle any errors that occur during the API request or processing
    if (axios.isAxiosError(error)) {
      // If the error is from Axios (e.g., network issues or API errors), log it and return a proper status code
      console.error('Axios error:', error.response?.data);
      res.status(error.response?.status || 500).json({
        error: `World Bank API error: ${error.response?.data?.message || 'Unexpected error'}`,
      });
    } else if (error instanceof Error) {
      // Handle generic JavaScript errors (non-Axios errors)
      console.error('Error:', error.message);
      res.status(500).json({ error: error.message });
    } else {
      // Fallback for any other unknown errors
      console.error('Unknown error:', error);
      res.status(500).json({ error: 'An unknown error occurred.' });
    }
  }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
