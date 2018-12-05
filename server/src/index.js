
import express from 'express';
import middlewaresConfig from './config/middlewares';
import { CustomerRoutes, AddressRoutes } from './modules';
import './config/db'

const app = express();

middlewaresConfig(app);

app.get('/test', (req, res) => {
  res.send('Welcome');
});

app.use('/api/v1/customers', CustomerRoutes);
app.use('/api/v1/addresses', AddressRoutes);

app.listen( process.env.PORT || 3000, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server is running`);
  }
});
