import { Group, Image, User } from '../../../models';

export default {
  Query: {
    groups: async (parent, args, context) => {
      return Group.findAll({
        where: {
          organisation_id: context.authUser.organisation[0].id,
        },
        include: [
          {
            model: User,
            as: 'users',
            attributes: ['id', 'first_name', 'last_name'],
            include: [
              {
                model: Image,
                as: 'image',
                attributes: ['id', 'thumbnail'],
              },
            ],
          },
        ],
      });
    },
  },
};
