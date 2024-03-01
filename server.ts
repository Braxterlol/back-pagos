import express from 'express';
import cors from 'cors';
import { PaymentController } from './src/infrastructure/adapters/controllers/PaymentControllers';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors())

const paymentController = new PaymentController();

app.post('/pagos', (req, res) => {
  paymentController.handlePaymentRequest(req, res);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
