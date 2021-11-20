import { SchemaDirectiveVisitor } from 'apollo-server-express';
import {
  GraphQLDirective,
  DirectiveLocation,
  GraphQLList,
  defaultFieldResolver,
} from 'graphql';

class HasTypeDirective extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration(directiveName, schema) {
    return new GraphQLDirective({
      name: 'hasType',
      locations: [DirectiveLocation.FIELD_DEFINITION],
      args: {
        types: {
          type: new GraphQLList(schema.getType('OrganisationType')),
        },
      },
    });
  }
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    const { types } = this.args;

    field.resolve = async function (...args) {
      const [, , context] = args;
      if (
        context.authUser &&
        context.authUser.organisation &&
        context.authUser.organisation[0] &&
        types.includes(context.authUser.organisation[0].organisation_type)
      ) {
        const result = await resolve.apply(this, args);
        return result;
      } else {
        throw new Error(
          'You have no right organisation type to do this action.'
        );
      }
    };
  }
}
export default HasTypeDirective;
