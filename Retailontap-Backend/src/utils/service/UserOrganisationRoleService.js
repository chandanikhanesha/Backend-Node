import { UserOrganisationRole } from '../../../models';

export const create = (user_id, role_id, organisation_id) => {
  return UserOrganisationRole.create({
    user_id,
    role_id,
    organisation_id,
  }).then((data) => {
    return data;
  });
};
