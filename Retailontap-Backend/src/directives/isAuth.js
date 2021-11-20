import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';

export default class IsAuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    // console.log('field', field);
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function (...args) {
      const [, , { user, authUser }] = args;
      if (user && user.username && user.username !== '') {
        if (authUser && authUser.is_active) {
          const result = await resolve.apply(this, args);
          return result;
        } else {
          throw new Error(
            'Your account has been deactivated please contact your organisation admin.'
          );
        }
      } else {
        throw new Error('You need to be authenticated to perform this action');
      }
    };
  }
}
