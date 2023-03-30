const {gql} = require('apollo-server-express')

const typeDefs = gql`
type Club {
    id: ID
    name: String
    founded: Int
    stadium: String
    players: [Player]
}

type Player {
    id: ID!
    name: String
    age: Int
    club: Club
}

#ROOT TYPE
type Query {
    clubs: [Club]
    club (id: ID!): Club
    players: [Player]
    player (id: ID!): Player
}

type Mutation {
    addClub(name: String, founded: Int, stadium: String ): Club,
    updateClub(id: ID!, name: String, founded: Int, stadium: String ): Club,
    deleteClub(id: ID!): Club,
    addPlayer(name: String, age: Int, clubId: ID! ): Player
}

type Subscription {
  clubAdded: Club!
}
`
module.exports = typeDefs

