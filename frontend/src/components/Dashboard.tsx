import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from './DataTable';
import EmissionsChart from './EmissionsChart';

const Dashboard: React.FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/emissions?countries=USA,CHN,IND&start_year=2010&end_year=2019');
        setData(response.data);
      } catch (err) {
        setError('Failed to load emissions data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <DataTable data={data} />
      <EmissionsChart data={data} />
    </div>
  );
};

export default Dashboard;
