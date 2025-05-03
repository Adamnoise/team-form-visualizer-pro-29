
import React from 'react';
import { Typography, Box, Grid, Card, CardContent } from '@mui/material';

const FeaturedTeams: React.FC = () => {
  return (
    <Box mt={4} mb={4}>
      <Typography variant="h5" gutterBottom>
        Featured Teams
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Team 1</Typography>
              <Typography color="textSecondary">Premier League</Typography>
              <Typography variant="body2">
                Stadium: Stadium 1
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Team 2</Typography>
              <Typography color="textSecondary">Premier League</Typography>
              <Typography variant="body2">Stadium: Stadium 2</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Team 3</Typography>
              <Typography color="textSecondary">Premier League</Typography>
              <Typography variant="body2">Stadium: Stadium 3</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Team 4</Typography>
              <Typography color="textSecondary">Premier League</Typography>
              <Typography variant="body2">Stadium: Stadium 4</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FeaturedTeams;
