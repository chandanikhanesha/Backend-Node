import { response, validateForm } from '../../utils/functions';
import * as ReportDashboard from '../../utils/service/ReportDashboard';

export default {
    Mutation: {
        filterShowRoomByUserId: async (parent, args, context) => {
            let errors = null;

            const validationRule = {
                filterValue: 'required|string',
            };

            const validation = await validateForm(args, validationRule);
            if (validation.errors) {
                errors = JSON.stringify(validation.errors);
                return response('filter-show-room', 'Validation failed!', 422, errors);
            }

            try {
                let ids = [];
                let filterCondition = '';
                if (args.filterValue === 'most_views') {
                    filterCondition = 'ORDER BY views DESC';
                } else if (args.filterValue === 'least_views') {
                    filterCondition = 'ORDER BY views ASC';
                } else if (args.filterValue === 'newest') {
                    filterCondition = 'ORDER BY created_at DESC';
                } else if (args.filterValue === 'oldest') {
                    filterCondition = 'ORDER BY created_at ASC';
                } else if (args.filterValue === 'order_geterated') {
                    filterCondition = 'ORDER BY count(o.id) DESC';
                }

                ids.push(args.id);

                const products = await ReportDashboard.ShowRoomProducts({
                    ids,
                    filterCondition,
                });

                return products;
            } catch (e) { }
        },
    },
};
