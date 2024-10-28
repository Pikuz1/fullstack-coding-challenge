import request from 'supertest';
import express, { Request, Response } from 'express';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import app from './index'; // Make sure you export the app instance from your index file

// Mock the Axios instance used in your API
const mock = new MockAdapter(axios);

describe('GET /api/emissions', () => {
  it('should return data for valid country codes and year range', async () => {
    // Mock the World Bank API response
    mock.onGet(/\/v2\/country\/USA\/indicator/).reply(200, [
      {},
      [
        { date: '2010', value: 5000 },
        { date: '2011', value: 5200 },
      ],
    ]);

    const response = await request(app).get('/api/emissions?countries=USA&start_year=2010&end_year=2011');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        country: 'USA',
        data: [
          { year: '2010', emissions: 5000 },
          { year: '2011', emissions: 5200 },
        ],
      },
    ]);
  });

  it('should return 400 if query parameters are missing', async () => {
    const response = await request(app).get('/api/emissions');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'Missing query parameters. Please provide countries, start_year, and end_year.',
    });
  });

  it('should return 500 if the World Bank API request fails', async () => {
    // Mock a failed API request
    mock.onGet(/\/v2\/country\/USA\/indicator/).reply(500);

    const response = await request(app).get('/api/emissions?countries=USA&start_year=2010&end_year=2011');
    expect(response.status).toBe(500);
    expect(response.body.error).toContain('World Bank API error');
  });
});
