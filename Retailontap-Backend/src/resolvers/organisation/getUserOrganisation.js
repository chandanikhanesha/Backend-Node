import { Organisation, Image, User, Role } from '../../../models';

export default {
  Query: {
    organisation: async (parent, {}, context) => {
      let org = null;
      let logo = null;
      try {
        await Organisation.findOne({
          where: {
            id: context.authUser.organisation[0].id,
          },
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['first_name', 'last_name', 'work_email'],
              where: {
                id: context.authUser.id,
              },
            },
            {
              model: Role,
              as: 'role',
              attributes: ['id', 'name'],
              where: {
                id: context.authUser.role[0].id,
              },
            },
            {
              model: Image,
              as: 'logo',
              attributes: ['id', 'imagable_id', 'imagable_type', 'thumbnail'],
            },
          ],
        }).then((organisation) => {
          org = organisation;
          org.user = org.user[0];
          org.role = org.role[0];
        });
        return org;
      } catch (e) {
        return null;
      }
    },
  },
};
