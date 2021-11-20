import * as StripeService from '../../utils/service/StripeService';
import Helper from '../../utils/helper';
import { Paginator } from '../../utils/functions';

export default {
  Query: {
    payments: async (parent, args, context) => {
      if (context.authUser && context.authUser.stripe_customer_id) {
        let invoiceData = null;
        let paymentsList = [];

        const payments = await StripeService.getPaymentIntents(
          context.authUser.stripe_customer_id
        );

        if(payments && payments.data) {         
          const sortedData = await payments.data.sort(Helper.sortJsonArray(args.sortby, args.sortdirection));
          
          const result = await Paginator(sortedData, args.page, args.pagesize);
          
          if(result){              
            result.data.map((item,index) => {              
              invoiceData = StripeService.retrieveInvoice(item.invoice);
              item['invoice_details'] = invoiceData;
              paymentsList.push(item);              
            });
              
            if (paymentsList.length) {
              return {
                totalItems: result.total,
                paymentsList: paymentsList
              }
            }
          }
        }
      } else {
         return {
           totalItems : 0,
           paymentsList: null
         }
      }
    },
  },
};
