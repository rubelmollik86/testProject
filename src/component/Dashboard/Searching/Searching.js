import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import SearchingM from '../../../image/Searching1.png';
import ArrowImage from '../../../image/Icon/Arrow12.png';
import SearchingI from '../../../image/Searching.png';
import './Searching.css';
const Searching = () => {
  return (
    <Box
      sx={{
        m: ' 0rem 5rem',
        '@media (min-width: 769px) and (max-width: 1024px)': {
          m: '1.5rem',
        },
        '@media (min-width: 320px) and (max-width: 768px)': {
          m: '10px',
        },
      }}
    >
      <Paper sx={{ p: '10px' }}>
        <Box>
          <Grid container alignItems="center">
            <Grid>
              <img src={SearchingM} alt="" />
            </Grid>
            <Grid className="text-color">
              <Typography variant="h6">
                <strong>
                  Wait A second! We are Looking Best Fare For You!
                </strong>
              </Typography>
              <Typography className="text-image-alignement">
                <strong>DAC(Dhaka)</strong> &nbsp;
                <img src={ArrowImage} alt="" /> &nbsp;
                <strong>JFK(New York)</strong>
              </Typography>
              <Typography>13th May 2022 | (Economy) | Adult: 1</Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Grid container justifyContent={'center'} alignItems={'center'}>
        <Grid>
          <img src={SearchingI} alt="" />
          <Typography variant="h5" fontWeight={'bold'} className="text-color">
            Finding Your Flights.....!
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Searching;
 