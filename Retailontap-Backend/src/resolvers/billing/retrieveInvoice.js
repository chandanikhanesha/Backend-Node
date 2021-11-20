import * as StripeService from '../../utils/service/StripeService';
import { response, validateForm } from '../../utils/functions';

export default {
  Mutation: {
    retrieveInvoice: async (parent, args, context) => {
      let errors = null;
      const validationRule = {
        invoice_id: 'required|string'               
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'retrieve-invoice',
          'Validation failed!',
          422,
          errors
        );
      }

      const invoice = await StripeService.retrieveInvoice(args.invoice_id);
      
      if (!invoice) {
        return {
          path: 'retrieve-invoice',
          message: 'Get subscription failed',
          code: 400,
          errors: null,
          invoice: null,
        };
      }

      return {
        path: 'retrieve-invoice',
        message: 'Invoice details',
        code: 200,
        errors: null,
        invoice: invoice,
      };
    },
  },
};