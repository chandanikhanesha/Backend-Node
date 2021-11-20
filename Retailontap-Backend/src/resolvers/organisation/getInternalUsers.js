import { Image, Organisation, Role, User } from '../../../models';

export default {
  Query: {
    internalUsers: async (parent, {}, context) => {
      const users = await User.findAll({
        attributes: [
          'id',
          'first_name',
          'last_name',
          'work_email',
          'activated',
          'last_accessed',
          'created_at',
        ],
        include: [
          {
            model: Organisation,
            as: 'organisation',
            attributes: ['id', 'name'],
            where: {
              id: context.authUser.organisation[0].id,
            },
          },
          {
            model: Role,
            as: 'role',
            attributes: ['id', 'name'],
          },
          {
            model: Image,
            as: 'image',
            attributes: ['id', 'thumbnail'],
          },
        ],
      });

      return users;
    },
  },
};
