import express from 'express';
import middlewaresConfig from './config/middlewares';

const app = express();

middlewaresConfig(app);

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.listen(3000, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server BookingCar is running !!`);
  }
});

