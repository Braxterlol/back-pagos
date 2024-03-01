
import { Payment } from '../../domain/entitites/Payment';
import { RabbitMQ } from '../../infrastructure/adapters/menssaging/RabbitMQ';

export class PaymentService {
  async processPayment(paymentData: Payment) {
    try {
      const rabbitMQ = new RabbitMQ();
      await rabbitMQ.connect();
      
      const exchange = 'initial';
      const routingKey = 'pagos';
      const msg = JSON.stringify(paymentData);

      await rabbitMQ.publish(exchange, routingKey, msg);

      await rabbitMQ.close();
    } catch (error) {
      console.error('Error al enviar el mensaje a RabbitMQ:', error);
      throw new Error('Error al procesar el pago');
    }
  }
}
