import { OrganisationCertification } from '../../../models';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

export default {
    Query: {
        certificates: async (parent, args, context) => {                       
            var offset = args.page * args.pagesize;
            var limit = args.pagesize;

            if (args.searchtext !== null && args.searchtext !== "") {
                const { count, rows: results } = await OrganisationCertification.findAndCountAll(
                    {
                        offset,
                        limit,
                        where: {
                            name: { [Op.iLike]: '%' + args.searchtext + '%' },
                            organisation_id: context.authUser.organisation[0].id,
                            is_deleted: false
                        },
                        order: [[args.sortby, args.sortdireaction]]
                    });

                return {
                    results,
                    totalRecords: count
                }
            }
            else {
                const { count, rows: results } = await OrganisationCertification.findAndCountAll(
                    {
                        offset,
                        limit,
                        where: { organisation_id: context.authUser.organisation[0].id, is_deleted: false},
                        order: [[args.sortby, args.sortdireaction]]
                    });

                return {
                    results,
                    totalRecords: count
                }
            }
        },
    },
};