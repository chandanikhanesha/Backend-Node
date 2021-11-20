import { Connection } from '../../../models';

export const createConnection = (data) => {
  return Connection.bulkCreate([
    {
      invited_by: data.invited_by,
      from: data.from,
      to: data.to,
      model: data.model,
      status_id: data.status_id,
      token: data.token,
    },
    {
      invited_by: data.invited_by,
      from: data.to,
      to: data.from,
      model: data.model,
      status_id: data.status_id,
      token: data.token,
    },
  ]).then((connection) => {
    return connection;
  });
};

export const checkConnectionExist = (data) => {
  return Connection.findOne({
    where: {
      invited_by: data.invited_by,
      from: data.from,
      to: data.to,
      model: data.model,
    },
  }).then((connection) => {
    return connection;
  });
};
