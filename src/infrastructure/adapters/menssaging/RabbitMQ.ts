import amqp from 'amqplib';

export class RabbitMQ {
  private connection: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;

  async connect() {
    this.connection = await amqp.connect('amqp://23.22.15.136');
    this.channel = await this.connection.createChannel();
  }

  async publish(exchange: string, routingKey: string, message: string) {
    if (!this.channel) {
      throw new Error('No se ha establecido la conexión con RabbitMQ');
    }

    await this.channel.assertExchange(exchange, 'direct', { durable: true });
    await this.channel.publish(exchange, routingKey, Buffer.from(message));
    console.log(" [x] Sent %s", message);
  }

  async close() {
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
  }
}
