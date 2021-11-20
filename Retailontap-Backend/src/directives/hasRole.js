import { SchemaDirectiveVisitor } from 'apollo-server-express';
import {
  GraphQLDirective,
  DirectiveLocation,
  GraphQLList,
  defaultFieldResolver,
} from 'graphql';

class HasRoleDirective extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration(directiveName, schema) {
    return new GraphQLDirective({
      name: 'hasRole',
      locations: [DirectiveLocation.FIELD_DEFINITION],
      args: {
        roles: {
          type: new GraphQLList(schema.getType('UserRole')),
        },
      },
    });
  }
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    const { roles } = this.args;

    field.resolve = async function (...args) {
      const [, , context] = args;

      if (
        context.authUser &&
        context.authUser.role &&
        context.authUser.role[0] &&
        roles.includes(context.authUser.role[0].name)
      ) {
        const result = await resolve.apply(this, args);
        return result;
      } else {
        throw new Error('You do not have permission to perform this action.');
      }
    };
  }
}
export default HasRoleDirective;
