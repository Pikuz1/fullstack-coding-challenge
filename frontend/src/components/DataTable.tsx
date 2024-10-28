import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface DataTableProps {
  data: Array<{ country: string; data: Array<{ year: string; emissions: number }> }>;
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Country</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Emissions (kt)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((countryData) =>
            countryData.data.map((yearData) => (
              <TableRow key={`${countryData.country}-${yearData.year}`}>
                <TableCell>{countryData.country}</TableCell>
                <TableCell>{yearData.year}</TableCell>
                <TableCell>{yearData.emissions}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
