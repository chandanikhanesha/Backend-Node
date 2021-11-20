import { Subscription } from '../../../models';

export const createSubscription = async (subscription) => {
  const subscriptionData = {
    subscription_id: subscription.id,
    interval: subscription.plan.interval,
    // amount: subscription.plan.amount,
    currency: subscription.plan.currency,
    billing_cycle_anchor: subscription.billing_cycle_anchor,
    cancel_at: subscription.cancel_at,
    canceled_at: subscription.canceled_at,
    created: subscription.created,
    current_period_end: subscription.current_period_end,
    current_period_start: subscription.current_period_start,
    customer_id: subscription.customer,
    price_id: subscription.plan.id,
    license_id: subscription.plan.product.id,
    item_id: subscription.items.data[0].id,
    // latest_invoice: subscription.latest_invoice,
    quantity: subscription.quantity,
    schedule: subscription.schedule,
    start_date: subscription.start_date,
    status: subscription.status,
    transfer_data: subscription.transfer_data,
  };

  if (subscription.plan.tiers && subscription.plan.tiers[1]) {
    subscriptionData.amount = subscription.plan.tiers[1].unit_amount;
  } else if (subscription.plan.tiers && !subscription.plan.tiers[1]) {
    subscriptionData.amount = 0;
  } else {
    subscriptionData.amount = subscription.plan.amount;
  }

  const createSubscription = await Subscription.create(subscriptionData);
  return createSubscription;
};

export const updateSubscription = async (
  selectedSubscription,
  subscription
) => {
  const subscriptionData = {
    subscription_id: subscription.id,
    interval: subscription.plan.interval,
    // amount: subscription.plan.amount,
    currency: subscription.plan.currency,
    billing_cycle_anchor: subscription.billing_cycle_anchor,
    cancel_at: subscription.cancel_at,
    canceled_at: subscription.canceled_at,
    created: subscription.created,
    // current_period_end: subscription.current_period_end,
    // current_period_start: subscription.current_period_start,
    // customer_id: subscription.customer,
    price_id: subscription.plan.id,
    // license_id: subscription.plan.product,
    item_id: subscription.items.data[0].id,
    // latest_invoice: subscription.latest_invoice,
    quantity: subscription.quantity,
    schedule: subscription.schedule,
    start_date: subscription.start_date,
    status: subscription.status,
    transfer_data: subscription.transfer_data,
  };

  if (subscription.plan.tiers && subscription.plan.tiers[1]) {
    subscriptionData.amount = subscription.plan.tiers[1].unit_amount;
  } else if (subscription.plan.tiers && !subscription.plan.tiers[1]) {
    subscriptionData.amount = 0;
  } else {
    subscriptionData.amount = subscription.plan.amount;
  }

  const updateSubscription = await selectedSubscription.update(
    subscriptionData
  );
  return updateSubscription;
};
