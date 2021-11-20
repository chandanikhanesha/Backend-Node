'use strict';
module.exports = (sequelize, DataTypes) => {
  const Invitations = sequelize.define(
    'Invitations',
    {
      name: DataTypes.STRING,
    },
    {}
  );
  Invitations.associate = function (models) {
    // associations can be defined here
  };
  return Invitations;
};
