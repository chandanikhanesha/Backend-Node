import { Organisation, User, Role, Image } from '../../../models';

export default {
  Query: {
    owner: async (parent, {}, context) => {
      try {
        const owner = await User.findOne({
          attributes: ['id', 'first_name', 'last_name', 'work_email'],
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
              where: {
                id: parseInt(process.env.OWNER_ROLE_ID),
              },
            },
            {
              model: Image,
              as: 'image',
              attributes: ['id', 'thumbnail'],
            },
          ],
        });
        return owner;
      } catch (e) {
        return null;
      }
    },
  },
};
