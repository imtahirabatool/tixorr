export enum OrderStatus {
  // The order has been created, but the ticket has not yet been reserved or paid for.
  Created = 'created',

  // The order has been cancelled.
  // This can happen due to:
  // - The user manually cancelling the order
  // - The system expiring the order if payment wasn't made in time
  // - The ticket being reserved by someone else
  Cancelled = 'cancelled',

  // The order is created and awaiting payment from the user.
  // This means the ticket is reserved for the user but payment hasn't been completed yet.
  AwaitingPayment = 'awaiting:payment',

  // The order has been successfully paid for and is now complete.
  // The ticket is confirmed and belongs to the user.
  Complete = 'complete'
}
