import { Colour, Hashtag, Image, Material, Product } from '../../../models';

export const getProducts = async ({ condition }) => {
  const products = await Product.findAll({
    where: condition.product,
    include: [
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
  return products;
};
