'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rights = sequelize.define(
    'Rights',
    {
      name: DataTypes.STRING,
    },
    {}
  );
  Rights.associate = function (models) {
    // associations can be defined here
  };
  return Rights;
};
