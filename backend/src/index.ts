import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});

app.get('/api/emissions', async (req: Request, res: Response): Promise<void> => {
  const { countries, start_year, end_year } = req.query;

  if (!countries || !start_year || !end_year) {
    res.status(400).json({ error: 'Missing query parameters. Please provide countries, start_year, and end_year.' });
    return;
  }

  const countryList = (countries as string).split(',');

  try {
    const results = await Promise.all(
      countryList.map(async (country) => {
        const response = await axios.get(
          `https://api.worldbank.org/v2/country/${country}/indicator/EN.ATM.CO2E.KT?date=${start_year}:${end_year}&format=json`,
          {
            headers: {
              'User-Agent': 'CarbonEmissionsApp/1.0',
            },
          }
        );

        const data = response.data[1]
          ? response.data[1].map((entry: any) => ({
              year: entry.date,
              emissions: entry.value,
            }))
          : [];

        return {
          country,
          data,
        };
      })
    );

    res.json(results);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data);
      res.status(error.response?.status || 500).json({
        error: `World Bank API error: ${error.response?.data?.message || 'Unexpected error'}`,
      });
    } else if (error instanceof Error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: error.message });
    } else {
      console.error('Unknown error:', error);
      res.status(500).json({ error: 'An unknown error occurred.' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
