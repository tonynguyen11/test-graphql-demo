const resolvers = {
    //Query
    Query: {
        players: async (parent, args, {mongoDataMethods}) => await mongoDataMethods.getAllPlayers(),
        player: async (parent, {id},{mongoDataMethods}) => await mongoDataMethods.getPlayerById(id),
        clubs: async (parent, args, {mongoDataMethods}) => await mongoDataMethods.getAllClubs(),
        club: async (parent, {id}, {mongoDataMethods}) => await mongoDataMethods.getClubById(id)
    },
    Player: {
        club: async ({clubId}, args, {mongoDataMethods}) => await mongoDataMethods.getClubById(clubId)
    },
    Club: {
        players: async ({id}, args, {mongoDataMethods}) => await mongoDataMethods.getAllPlayers({clubId: id})
    },

     //Mutation
    Mutation: {
        addClub: async (parent, args, { mongoDataMethods }) => {
            const newClub = await mongoDataMethods.addClub(args);
            mongoDataMethods.pubsub.publish('clubAdded', { clubAdded: newClub });
            return newClub;
          },
        updateClub: async (parent, {id, ...args}, {mongoDataMethods}) => {
            const updatedClub = await mongoDataMethods.updateClub(id, args);
            if(!updatedClub) throw new Error(`Club with id ${id} not found`);
            return updatedClub;
        },
        deleteClub: async (parent, {id}, {mongoDataMethods}) => {
            const deletedClub = await mongoDataMethods.deleteClub(id);
            if(!deletedClub) throw new Error(`Club with id ${id} not found`);
            return deletedClub;
        },
        addPlayer: async (parent, args, {mongoDataMethods}) => await mongoDataMethods.addPlayer(args),
    },

    //Subscription
    Subscription: {
        clubAdded: {
          subscribe: () => mongoDataMethods.pubsub.asyncIterator('clubAdded'),
          resolve: payload => payload.clubAdded,
        },
      },

}

module.exports = resolvers