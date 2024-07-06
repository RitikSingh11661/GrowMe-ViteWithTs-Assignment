import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Post } from '../models/Post';
import { Box, Typography } from '@mui/material';

const DataTable: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json()).then(data => {
      setPosts(data);
      setLoading(false);
    })
    .catch(error => {
      console.error("There was an error fetching the data!", error);
      setLoading(false);
    });
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'userId', headerName: 'User ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'body', headerName: 'Body', width: 300 }
  ];

  return (
    <Box sx={{ height: 400, width: '60%',margin:'auto'}}>
      <Typography variant="h5" component="h2">Posts</Typography>
      <DataGrid rows={posts} columns={columns} paginationModel={paginationModel} onPaginationModelChange={setPaginationModel} loading={loading}/>
    </Box>
  );
};

export default DataTable;