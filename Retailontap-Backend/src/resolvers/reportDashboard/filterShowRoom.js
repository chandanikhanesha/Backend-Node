import { response, validateForm } from '../../utils/functions';
import * as ReportDashboard from '../../utils/service/ReportDashboard';
import * as OrganisationService from '../../utils/service/OrganisationService';

export default {
    Mutation: {
        filterShowRoom: async (parent, args, context) => {
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
                let sIds = [];
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

                sIds = await ReportDashboard.getIdsByRole({ context });

                console.log("sIds: " + sIds);
                console.log("**************************");

                if (args.supplierId === 0) {
                    let userCondition = {
                        id: context.authUser.id,
                    };
                    const searchCondition = { userCondition };

                    const users = await OrganisationService.getExternalUsers(searchCondition);

                    if (users && users.externalUsers && users.externalUsers.length > 0) {
                        ids = users.externalUsers.map((user) => user.id);
                    } else {
                        ids = [];
                    }

                    ids.push(sIds);
                }
                else {
                    ids.push(args.supplierId);
                }
                
                let filterByDate = args.filterByDate;
                let filterByHashtag = args.filterByHashtag
                console.log("********** 1 ********** : " + filterByDate);
                console.log("********** 2 ********** : " + filterByHashtag);
                const products = await ReportDashboard.ShowRoomProducts({
                    ids,
                    filterCondition,
                    filterByDate,
                    filterByHashtag
                });
                
                return products;
            } catch (e) { }
        },
    },
};
