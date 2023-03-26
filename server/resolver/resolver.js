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
        players: async ({id}, args, {mongoDataMethods}) => await mongoDataMethods.getAllClubs({clubId: id})
    },

     //Mutation
    Mutation: {
        addClub: async (parent, arg, {mongoDataMethods}) => await mongoDataMethods.addClub(args),
        addPlayer: async (parent, arg, {mongoDataMethods}) => await mongoDataMethods.addPlayer(args),
    }

}

module.exports = resolvers