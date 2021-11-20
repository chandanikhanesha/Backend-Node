'use strict';
module.exports = (sequelize, DataTypes) => {
  const RoleRights = sequelize.define(
    'RoleRights',
    {
      name: DataTypes.STRING,
    },
    {}
  );
  RoleRights.associate = function (models) {
    // associations can be defined here
  };
  return RoleRights;
};
