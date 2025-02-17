import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import "./load.css"
export default function Animations() {
  return (
    <>
    <div style={{display:"flex" , justifyContent:"center" ,alignItems:"center" , marginTop:"5rem" }} className=' load mb-5'  >
    <Box sx={{ width: "100%" }}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
    </div>
    </>
  );
}