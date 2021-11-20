import {
  Hashtag,
  Image,
  Order,
  Organisation,
  Product,
  ProductItem,
  Project,
  Quotation,
  QuotationItems,
  User,
} from '../../../models';

export const getOrders = async ({ condition }) => {
  return Order.findAll({
    attributes: ['id', 'delivery_date', 'created_at'],
    where: condition.order,
    include: [
      {
        model: Project,
        as: 'project',
        attributes: ['id', 'name'],
        required: true,
        include: [
          {
            model: Product,
            as: 'product',
            attributes: ['id'],
            required: true,
            include: [
              {
                model: Image,
                as: 'images',
                attributes: ['thumbnail'],
                separate: true,
                limit: 1,
              },
              {
                model: Hashtag,
                as: 'hashtags',
                attributes: ['id'],
                required: false,
                where: condition.hashtag,
              },
            ],
          },
        ],
      },
      {
        model: QuotationItems,
        as: 'item',
        attributes: ['quantity'],
        required: true,
        include: [
          {
            model: Quotation,
            as: 'quotation',
            attributes: ['id'],
            where: condition.quotation,
            include: [
              {
                model: User,
                as: condition.aliasUser,
                attributes: ['id', 'first_name', 'last_name'],
                include: [
                  {
                    model: Organisation,
                    as: 'organisation',
                    attributes: ['id', 'name'],
                  },
                ],
              },
            ],
          },
          {
            model: ProductItem,
            as: 'productItem',
            attributes: ['unit_price'],
          },
        ],
      },
    ],
  });
};
