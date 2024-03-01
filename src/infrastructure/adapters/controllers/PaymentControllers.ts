import { Request, Response } from 'express';
import { PaymentService } from '../../../application/services/PaymentService';

export class PaymentController {
  private paymentService: PaymentService;

  constructor() {
    this.paymentService = new PaymentService();
  }

  async handlePaymentRequest(req: Request, res: Response) {
    try {
      const paymentData = req.body;
      await this.paymentService.processPayment(paymentData);
      res.sendStatus(200);
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      res.sendStatus(500);
    }
  }
}
