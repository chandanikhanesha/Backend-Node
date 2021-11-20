'use strict';
import stripe from './src/utils/stripe';
import * as StripeWebhookService from './src/utils/service/StripeWebhookService';

const incoming = (event, context, callback) => {
  const requestContextStage = event.requestContext
    ? event.requestContext.stage
    : 'test';
  const stripeApiKey = requestContextStage === process.env.STRIPE_SECRET_KEY;
  try {
    // Parse Stripe Event
    const jsonData = JSON.parse(event.body); // https://stripe.com/docs/api#event_object

    // Verify the event by fetching it from Stripe
    console.log("Stripe Event: %j", jsonData); // eslint-disable-line
    stripe.events.retrieve(jsonData.id, (err, stripeEvent) => {
      const eventType = stripeEvent.type ? stripeEvent.type : '';
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Stripe webhook incoming!',
          stage: requestContextStage,
        }),
      };
      console.log("Event Type: %j", eventType); // eslint-disable-line

      // Branch by event type
      switch (eventType) {
        //Product
        case 'product.created':
          StripeWebhookService.productCreateOrUpdate(stripeEvent);
          break;
        case 'product.updated':
          StripeWebhookService.productCreateOrUpdate(stripeEvent);
          break;
        case 'product.deleted':
          StripeWebhookService.productDeleted(stripeEvent);
          break;
        //Price
        // case 'price.created':
        //   StripeWebhookService.priceCreateOrUpdate(stripeEvent);
        //   break;
        // case 'price.updated':
        //   StripeWebhookService.priceCreateOrUpdate(stripeEvent);
        //   break;
        // case 'price.deleted':
        //   StripeWebhookService.priceDeleted(stripeEvent);
        //   break;
        //Plan
        case 'plan.created':
          StripeWebhookService.planCreateOrUpdate(stripeEvent);
          break;
        case 'plan.updated':
          StripeWebhookService.planCreateOrUpdate(stripeEvent);
          break;
        case 'plan.deleted':
          StripeWebhookService.planDeleted(stripeEvent);
          break;
        //Subscription
        case 'customer.subscription.created':
         // StripeWebhookService.subscriptionCreated(stripeEvent);
          break;
        case 'customer.subscription.updated':
         // StripeWebhookService.subscriptionUpdated(stripeEvent);
          break;
        case 'customer.subscription.deleted':
          StripeWebhookService.subscriptionDeleted(stripeEvent);
          break;

        case 'invoice.created':
          // invoice.created event
          break;
        default:
          break;
      }
      callback(null, response);
    });
  } catch (err) {
    callback(null, {
      statusCode: err.statusCode || 501,
      headers: { 'Content-Type': 'text/plain' },
      body: err.message || 'Internal server error',
    });
  }
};

export default incoming;
