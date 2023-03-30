/*
This is a GraphQL server implementation that connects to a MongoDB database and allows queries, mutations, 
and subscriptions to fetch, update, and add data.

The server sets up an Apollo server, which is configured to use the schema and resolver defined 
in the schema.js and resolver.js files, respectively. It also sets up a SubscriptionServer, which allows clients to subscribe to real-time updates.

The mongoDataMethods object contains functions that interact with the MongoDB database. 
For instance, getAllPlayers returns all player documents in the database, while addPlayer adds a new player document to the database.

The schema defines two types: Club and Player. A club has an id, name, year founded, stadium, and a list of players. 
A player has an id, name, age, and the club they belong to. The schema also defines root queries, mutations, and subscriptions for fetching, updating, and adding data to the database.

The resolver implements the behavior of the schema. For instance, the players query resolver invokes getAllPlayers to return all player documents in the database. 
Similarly, the addClub mutation resolver invokes the addClub function defined in mongoDataMethods to add a new club document to the database. 
The subscription resolver clubAdded publishes a new clubAdded event to the PubSub object defined in db.js whenever a new club is added to the database.

Overall, this is a simple implementation of a GraphQL server using MongoDB as a database.
*/
const { createServer } = require('http');
const express = require('express')
const {ApolloServer} = require('apollo-server-express')
const mongoose = require('mongoose')
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');


//Load schema & resolver
const typeDefs = require('./schema/schema')
const resolvers = require('./resolver/resolver')
const e = require('express')

//Load db methods
const mongoDataMethods = require('./data/db')

//Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://Toannguyen11:Nijd2e0GOLZ8njqV@demographql.cdo9tza.mongodb.net/?retryWrites=true&w=majority')
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

connectDB()

const app = express();
const httpServer = createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ mongoDataMethods }),
});

async function startServer() {
    await server.start();
  
    server.applyMiddleware({ app });
  
    SubscriptionServer.create(
      {
        schema: server.schema,
        execute,
        subscribe,
      },
      {
        server: httpServer,
        path: server.subscriptionsPath,
      }
    );
  
    httpServer.listen({ port: 4000 }, () => {
      console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
      console.log(`🚀 Subscriptions ready at ws://localhost:4000${server.subscriptionsPath}`);
    });
  }
  
  startServer();