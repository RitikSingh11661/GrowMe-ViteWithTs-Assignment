import React from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../components/DataTable';
import DepartmentList from '../components/DepartmentList';

const Page2: React.FC = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');

  React.useEffect(() => {
    if (!user) {
      alert('Please enter your details before accessing this page.');
      navigate('/');
    }
  }, [navigate, user]);

  if (!user) return null;

  return (
    <div style={{padding: 2,margin:'auto'}}>
      <DataTable/>
      <DepartmentList/>
    </div>
  );
};

export default Page2;