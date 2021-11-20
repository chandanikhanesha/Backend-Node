import {
  Country,
  Image,
  Organisation,
  Product,
  Project,
  Sample,
  User,
} from '../../../models';

export const getSamples = async ({ condition }) => {
  const samples = await Sample.findAll({
    where: condition.sample,
    attributes: ['id', 'received_date', 'track_number'],
    include: [
      {
        model: Project,
        as: 'project',
        attributes: ['id', 'name'],
        include: [
          {
            model: Product,
            as: 'product',
            attributes: ['id', 'description', 'name'],
            include: [
              {
                model: Image,
                as: 'images',
                attributes: ['id', 'thumbnail'],
                separate: true,
                limit: 1,
              },
            ],
          },
        ],
      },
      {
        model: Image,
        as: 'sample_image',
        attributes: ['id', 'thumbnail'],
      },
      {
        model: User,
        as: condition.aliasUser,
        attributes: ['id', 'first_name', 'last_name', 'work_email'],
        include: [
          {
            model: Image,
            as: 'image',
            attributes: ['thumbnail'],
          },
          {
            model: Organisation,
            as: 'organisation',
            attributes: ['id', 'name'],
            include: [
              {
                model: Country,
                as: 'country',
                attributes: ['id', 'name'],
              },
            ],
          },
        ],
      },
    ],
  });
  return samples;
};
