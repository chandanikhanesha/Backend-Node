import { License, Price, Subscription, Tier } from '../../../models';
import * as UserService from './UserService';
import * as BillingService from './BillingService';

export const productCreateOrUpdate = async (event) => {
  const data = {
    license_id: event.data.object.id,
    name: event.data.object.name,
    description: event.data.object.description,
    active: event.data.object.active,
    livemode: event.data.object.livemode,
  };

  const license = await License.findOne({
    where: {
      license_id: event.data.object.id,
    },
  });

  if (license) {
    await license.update(data);
  } else {
    await License.create(data);
  }
};

export const productDeleted = async (event) => {
  await License.destroy({
    where: {
      license_id: event.data.object.id,
    },
  });
};

export const priceCreateOrUpdate = async (event) => {
  const data = {
    price_id: event.data.object.id,
    license_id: event.data.object.product,
    currency: event.data.object.currency,
    livemode: event.data.object.livemode,
    active: event.data.object.active,
    billing_scheme: event.data.object.billing_scheme,
    tiers_mode: event.data.object.tiers_mode,
    unit_amount: event.data.object.unit_amount,
    unit_amount_decimal: event.data.object.unit_amount_decimal,
    interval: event.data.object.recurring.interval,
  };

  const price = await Price.findOne({
    where: {
      price_id: event.data.object.id,
    },
  });

  if (price) {
    await price.update(data);
  } else {
    await Price.create(data);
  }
};

export const priceDeleted = async (event) => {
  await Price.destroy({
    where: {
      price_id: event.data.object.id,
    },
  });
};

export const planCreateOrUpdate = async (event) => {
  const data = {
    price_id: event.data.object.id,
    license_id: event.data.object.product,
    currency: event.data.object.currency,
    livemode: event.data.object.livemode,
    active: event.data.object.active,
    billing_scheme: event.data.object.billing_scheme,
    tiers_mode: event.data.object.tiers_mode,
    unit_amount: event.data.object.unit_amount,
    unit_amount_decimal: event.data.object.unit_amount_decimal,
    interval: event.data.object.interval,
  };

  const price = await Price.findOne({
    where: {
      price_id: event.data.object.id,
    },
  });

  if (price) {
    await price.update(data);
  } else {
    await Price.create(data);
  }
  if (event.data.object.tiers && event.data.object.tiers.length > 0) {
    await Tier.destroy({
      where: {
        price_id: event.data.object.id,
      },
    });
    event.data.object.tiers.map(async (tierItem) => {
      tierItem.price_id = event.data.object.id;
      await Tier.create(tierItem);
    });
  }
};

export const planDeleted = async (event) => {
  await Price.destroy({
    where: {
      price_id: event.data.object.id,
    },
  });

  await Tier.destroy({
    where: {
      price_id: event.data.object.id,
    },
  });
};

export const subscriptionCreated = async (event) => {
  if (
    event.data.object.plan.product === process.env.STANDARD_LICENSE_ID &&
    event.data.object.status === 'active'
  ) {
    await UserService.activateUsers(
      event.data.object.customer,
      event.data.object.quantity +
        parseInt(process.env.FREE_STANDARD_LICENSE_COUNT)
    );
  }
};

export const subscriptionUpdated = async (event) => {
  const subscription = await Subscription.findOne({
    where: { subscription_id: event.data.object.id },
  });

  if (subscription) {
    await BillingService.updateSubscription(subscription, event.data.object);
    if (
      event.data.object.plan.product === process.env.STANDARD_LICENSE_ID &&
      event.data.object.status === 'unpaid'
    ) {
      // deactivate users
      await UserService.disableUsers(event);
    }

    if (
      event.data.object.plan.product === process.env.STANDARD_LICENSE_ID &&
      event.data.object.status === 'active'
    ) {
      await UserService.activateUsers(
        event.data.object.customer,
        event.data.object.quantity +
          parseInt(process.env.FREE_STANDARD_LICENSE_COUNT)
      );
    }
  }
};

export const subscriptionDeleted = async (event) => {
  await Subscription.destroy({
    where: {
      subscription_id: event.data.object.id,
    },
  });
};
