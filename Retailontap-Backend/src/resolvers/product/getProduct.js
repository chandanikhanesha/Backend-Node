import { Hashtag, Image, Product, Colour, Material, Organisation, User, Role } from '../../../models';
import { response, validateForm } from '../../utils/functions';
import * as OrganisationService from '../../utils/service/OrganisationService';
import { Op } from 'sequelize';

export default {
    Mutation: {
        product: async (parent, args, context) => {
            let errors = null;
            const validationRule = {
                id: 'required|integer',
            };

            const validation = await validateForm(args, validationRule);
            if (validation.errors) {
                errors = JSON.stringify(validation.errors);
                return response('get-product', 'Validation failed!', 422, errors);
            }

            let organisationId = {};

            const userOrganisationType = context.authUser.organisation[0].organisation_type;

            if (userOrganisationType === 'retailer') {
                const searchCondition = {
                    organisationIdCondition: { id: context.authUser.organisation[0].id },
                    externalOrganisationCondition: {
                        organisation_type: 'supplier',
                    },
                };
                const organisation = await OrganisationService.getExternalOrganisations(
                    searchCondition
                );
                if (organisation && organisation.externalOrganisations) {
                    const organisationIds = organisation.externalOrganisations.map(
                        ({ id }) => id
                    );
                    organisationId[Op.in] = [organisationIds];
                } else {
                    organisationId = context.authUser.organisation[0].id;
                }
            } else {
                organisationId = context.authUser.organisation[0].id;
            }
            console.log("orgId:", organisationId);

            return Product.findOne({
                where: {
                    //organisation_id: organisationId,
                    id: args.id,
                },
                include: [
                    {
                        model: Organisation,
                        as: 'organisation',
                        attributes: ['id', 'name', 'organisation_type'],
                        include: [
                            {
                                model: User,
                                as: 'user',
                                attributes: ['id', 'first_name', 'last_name', 'work_email'],
                                include: [
                                    {
                                        model: Image,
                                        as: 'image',
                                        attributes: ['thumbnail'],
                                    },
                                    {
                                        model: Role,
                                        as: 'role',
                                        attributes: ['id', 'name'],
                                        where: {
                                            id: parseInt(process.env.OWNER_ROLE_ID),
                                        },
                                    },
                                ]
                            },
                            {
                                model: Image,
                                as: 'logo',
                                attributes: ['id', 'thumbnail'],
                            }
                        ]
                    },
                    {
                        model: Hashtag,
                        as: 'hashtags',
                    },
                    {
                        model: Colour,
                        as: 'colours',
                    },
                    {
                        model: Material,
                        as: 'materials',
                    },
                    {
                        model: Image,
                        as: 'images',
                    },
                ],
            });
        },
    },
};
