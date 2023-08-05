import React from 'react';
import { Grid, Typography, Card, CardMedia, Container, TextField, Button } from '@mui/material';

export default function AboutUs(props) {
  return (
    <Container sx={{ mt: '26px', width:'90%' }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Card elevation={9} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component="img"
              height="300"
              src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
              alt="Team"
            />
            <Typography color='primary'variant="h4"  sx={{ p: 2 }}>
              Our Story
            </Typography>
            <Typography color='grey'variant="h5"align="justify" sx={{ p: 2 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin blandit tellus eu purus mollis, vitae
              dignissim risus cursus. Phasellus eget tortor lectus. Nunc faucibus et elit sit amet congue. Sed
              efficitur vel enim a accumsan. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin blandit tellus
              eu purus mollis, vitae dignissim risus cursus. Phasellus eget tortor lectus. Nunc faucibus et elit sit amet
              congue. Sed efficitur vel enim a accumsan. Phasellus eget tortor lectus. Nunc faucibus et elit sit amet
              congue. 
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={9} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component="img"
              height="300"
              src="https://images.unsplash.com/photo-1616587896595-51352538155b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
              alt="Team"
            />
            <Typography variant="h4"color='primary' sx={{ p: 2 }}>
              Our Values
            </Typography>
            <Typography variant="h5"color='grey' align="justify"sx={{ p: 2 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin blandit tellus eu purus mollis, vitae
              dignissim risus cursus. Phasellus eget tortor lectus. Nunc faucibus et elit sit amet congue. Sed
              efficitur vel enim a accumsan. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin blandit tellus
              eu purus mollis, vitae dignissim risus cursus. Phasellus eget tortor lectus. Nunc faucibus et elit sit amet
              congue. Sed efficitur vel enim a accumsan. Phasellus eget tortor lectus. Nunc faucibus et elit sit amet
              congue. 
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={12}>
          <Card elevation={9} sx={{ padding: 2, mt: 10 }}>
            <Typography variant="h5" color='secondary'>Contact Us</Typography>
            <form>
              <TextField
                id="name"
                label="Name"
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
              />
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
              />
              <TextField
                id="message"
                label="Message"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
              />
              <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                Submit
              </Button>
            </form>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
