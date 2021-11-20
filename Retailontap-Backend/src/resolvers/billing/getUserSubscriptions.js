import * as StripeService from '../../utils/service/StripeService';
import * as BillingService from '../../utils/service/BillingService';
import * as UserService from '../../utils/service/UserService';
import { User, Subscription, Organisation, Role  } from '../../../models';
import sequelize from 'sequelize';
import { Op } from 'sequelize';

export default {
  Query: {
    getUserSubscriptions: async (parent, args, context) => {
      let subscriptionsDetails = [];
      let standardLicenseQty = 0;
      let count = 0;
     
      const user = await User.findOne({
        where: { id: context.authUser.id },
        include: [
          {
            model: Subscription,
            as: 'subscriptions',
            where: {
              status: {
                [Op.in]: ['active','trialing'],
              }
            },
            order: [['id', 'ASC']]
            // attributes: ['id', 'name'],
          },
        ],
      });

      if (user && user.subscriptions.length > 0) {
        let userCounts = 0;

        userCounts = await User.count({
          where: { is_active: true },
          include: [
            {
              model: Organisation,
              as: 'organisation',              
              paranoid: false,
              where: {
                id: context.authUser.organisation[0].id,
              },
            },
            {
              model: Role,
              as: 'role',                
              where: {
                id: {
                  [sequelize.Op.ne]: parseInt(process.env.STAKEHOLDER_ROLE_ID),
                }
              },
            },
          ],
        });

        await new Promise((resolve) => {
          user.subscriptions.map(async (subscriptionItem) => {            
            const subscription = await StripeService.getSubscription(
              subscriptionItem.subscription_id
            );
            
            if(subscription.status === 'active') {
              if (subscription.latest_invoice) {
                let planIndex = 0;      
                let upcomingSubscription = null;
                let upcomingSubscription_invoice = null;
                let upcomingPlan = null;

                const upcomingInvoice = await StripeService.retrieveUpcomingInvoices(
                  subscriptionItem.subscription_id
                );

                if (upcomingInvoice && subscriptionItem.current_period_start !== upcomingInvoice.period_start) {
                  const newDates = {                  
                    current_period_start: upcomingInvoice.period_start,
                    current_period_end:upcomingInvoice.period_end,
                    status:'active'
                  }

                  await Subscription.update(newDates, { where: { subscription_id: subscriptionItem.subscription_id } });

                  subscriptionItem.current_period_start = upcomingInvoice.period_start;
                  subscriptionItem.current_period_end = upcomingInvoice.period_end;
                }

                if (subscription.plan.product.id === process.env.STANDARD_LICENSE_ID)
                  standardLicenseQty = subscription.items.data[0].quantity;

                const lastPurchasedPlan = await Subscription.findAll({
                  where: {
                    customer_id: context.authUser.stripe_customer_id,
                    license_id: subscription.plan.product.id,
                    status:{
                      [Op.in]: ['active','trialing'],
                    }
                  },
                  order: [['id', 'DESC']]
                });

                if (lastPurchasedPlan && lastPurchasedPlan.length) {
                  if (lastPurchasedPlan.length > 1)
                    planIndex = lastPurchasedPlan.length - 2;                    
                  else
                    planIndex = 0;

                 upcomingSubscription = await StripeService.getSubscription(
                      lastPurchasedPlan[planIndex].subscription_id
                  );

                 upcomingSubscription_invoice = await StripeService.retrieveUpcomingInvoices(
                      lastPurchasedPlan[planIndex].subscription_id
                  );

                 upcomingPlan = {
                   id: upcomingSubscription.id,
                   license_id: upcomingSubscription.plan.product.id,
                   card:upcomingSubscription.customer.invoice_settings.default_payment_method.card,
                   product_description: upcomingSubscription.plan.product.name,
                   current_price: upcomingSubscription.plan.id,
                   current_quantity: upcomingSubscription.items.data[0].quantity,
                   latest_invoice: upcomingSubscription.latest_invoice,
                   upcoming_invoice: upcomingSubscription_invoice,
                   start_date:lastPurchasedPlan[planIndex].current_period_start,
                   end_date:lastPurchasedPlan[planIndex].current_period_end,
                   status:upcomingSubscription.status
                  }
                }   

                const data = {
                  id: subscription.id,
                  license_id: subscription.plan.product.id,
                  card: subscription.customer.invoice_settings.default_payment_method.card,
                  product_description: subscription.plan.product.name,
                  current_price: subscription.plan.id,
                  current_quantity: subscription.items.data[0].quantity,
                  latest_invoice: subscription.latest_invoice,
                  upcoming_invoice: upcomingInvoice,
                  start_date: subscriptionItem.current_period_start,
                  end_date: subscriptionItem.current_period_end,
                  status: subscriptionItem.status,
                  used_license: subscription.plan.product.name === 'Standard License' ? userCounts : 0,
                  last_purchased_subscription_id:lastPurchasedPlan ? lastPurchasedPlan[0].subscription_id : '',
                  upcoming_subscription:upcomingPlan
                };

                subscriptionsDetails.push(data);
              }
            } else {
              await BillingService.updateSubscription(subscriptionItem,subscription);
            }

            count++;

            if(count === user.subscriptions.length) {
              resolve();
            }
          });
        });

        await UserService.activateUsers(
          context.authUser.stripe_customer_id,
          standardLicenseQty +
          parseInt(process.env.FREE_STANDARD_LICENSE_COUNT)
        );

        return subscriptionsDetails;
      } else {
        return [];
      }
    },
  },
};
