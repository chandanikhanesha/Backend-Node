import stripe from '../stripe';
import { response } from '../functions';

export const getLicenses = async () => {
  return await stripe.products.list({ active: true });
};

export const getPrices = async () => {
  return await stripe.prices.list({ active: true });
};

export const getLicensePrices = async (license_id) => {
  return await stripe.prices.list({ product: license_id, active: true });
};

export const getPrice = async (price_id) => {
  return await stripe.prices.retrieve(price_id);
};

export const getPlans = async () => {
  return await stripe.plans.list({ active: true });
};

export const getPaymentMethods = async (customer_id) => {
  return await stripe.paymentMethods.list({
    customer: customer_id,
    type: 'card',
  });
};

export const retrievePaymentMethod = async (payment_method_id) => {
  return await stripe.paymentMethods.retrieve(payment_method_id);
};

export const createCustomer = async (customerDetails) => {
  let customerData = null;
  await new Promise(async (resolve) => {
    await stripe.customers.create(customerDetails, function (err, customer) {
      customerData = customer;
      resolve();
    });
  });

  return customerData;
};

export const createSubscription = async (subscriptionDetails) => {
  let subscriptionData = null;
  await new Promise(async (resolve) => {
    await stripe.subscriptions.create(subscriptionDetails, function (
      err,
      subscription
    ) {      
      subscriptionData = subscription;
      resolve();
    });
  });

  return subscriptionData;
};

export const updateSubscription = async (
  subscription_id,
  subscriptionDetails
) => {
  let subscriptionData = null;
  await new Promise(async (resolve) => {
    await stripe.subscriptions.update(
      subscription_id,
      subscriptionDetails,
      function (err, subscription) {
        subscriptionData = subscription;
        resolve();
      }
    );
  });
  return subscriptionData;
};

export const cancelSubscription = async (subscription_id) => {
    let subscriptionData = null;
    await new Promise(async (resolve) => {
        await stripe.subscriptions.del(
            subscription_id,            
            function (err, subscription) {
                subscriptionData = subscription;
                resolve();
            }
        );
    });

    return subscriptionData;
};

export const getSubscription = async (subscription_id) => {
  let subscriptionData = null;
  await new Promise(async (resolve) => {
    await stripe.subscriptions.retrieve(
      subscription_id,
      {
        expand: [
          'latest_invoice',
          'customer.invoice_settings.default_payment_method',
          'plan.product',
        ],
      },
      function (err, subscription) {
        subscriptionData = subscription;
        resolve();
      }
    );
  });

  return subscriptionData;
};

export const retrieveUpcomingInvoices = async (subscription_id) => {
  let upcomingInvoice = null;
  await new Promise(async (resolve) => {
    await stripe.invoices.retrieveUpcoming(
      { subscription: subscription_id },
      function (err, upcoming) {
        upcomingInvoice = upcoming;
        resolve();
        // callback(err, upcoming);
      }
    );
  });

  return upcomingInvoice;
};

export const getCoupons = async () => {
  return await stripe.coupons.list();
};

export const getInvoices = async (customer_id) => {
  return await stripe.invoices.list({
    customer: customer_id,
  });
};

export const getPaymentIntents = async (customer_id) => {
  return await stripe.paymentIntents.list({
    customer: customer_id,
  });
};

export const getTransactions = async (customer_id) => {
  return await stripe.issuing.transactions.list({
    cardholder: customer_id,
  });
};

export const retrieveInvoice = async (invoice_id) => {
    return await stripe.invoices.retrieve(invoice_id);
};

export const paymentMethodsAttach = async (payment_method_id, customer_id) => {
  let paymentMethodData = null;
  await new Promise(async (resolve) => {
    await stripe.paymentMethods.attach(
      payment_method_id,
      { customer: customer_id },
      function (err, paymentMethod) {
        paymentMethodData = paymentMethod;
        resolve();
      }
    );
  });
  return paymentMethodData;
};

export const paymentMethodsDetach = async (payment_method_id) => {
  let paymentMethodData = null;
  await new Promise(async (resolve) => {
    await stripe.paymentMethods.detach(payment_method_id, function (
      err,
      paymentMethod
    ) {
      paymentMethodData = paymentMethod;
      resolve();
    });
  });
  return paymentMethodData;
};

export const updateCustomer = async (customer_id, data) => {
  let cusstomerData = null;
  await new Promise(async (resolve) => {
    await stripe.customers.update(customer_id, data, function (err, customer) {
      cusstomerData = customer;
      resolve();
    });
  });
  return cusstomerData;
};
