export default {
    Query: {
        user: async (parent, { }, context) => {
            try {
                return context.authUser;
            } catch (e) {
                return null;
            }
        },
    },
};
