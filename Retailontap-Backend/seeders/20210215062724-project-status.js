'use strict';

const createdDate = new Date().toUTCString();

module.exports = {
    up: (queryInterface, Sequelize) => {        
    return queryInterface.bulkInsert('project_status', [
      {       
        name: "Invitation Sent",
        created_at: createdDate,
      },
      {       
        name: "Invitation Accepted",
        created_at:createdDate,
      },
      {       
        name: "Sample Requested",
        created_at:createdDate,
      },
      {       
        name: "Sample Received",
        created_at:createdDate,
      },
      {       
        name: "Quotation Requested",
        created_at:createdDate,
      },
      {       
        name: "Quotation Received",
        created_at:createdDate,
      },
      {       
        name: "Order Placed",
        created_at:createdDate,
      },
      {       
        name: "Order Delivered",
        created_at:createdDate,
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('project_status', null, {});
  }
};
