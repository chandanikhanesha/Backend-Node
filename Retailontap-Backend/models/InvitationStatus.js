'use strict';
module.exports = (sequelize, DataTypes) => {
  const InvitationStatuses = sequelize.define(
    'InvitationStatuses',
    {
      name: DataTypes.STRING,
    },
    {}
  );
  InvitationStatuses.associate = function (models) {
    // associations can be defined here
  };
  return InvitationStatuses;
};
