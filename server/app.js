const express = require('express')
const {ApolloServer} = require('apollo-server-express')
const mongoose = require('mongoose')

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

const server = new ApolloServer({
    typeDefs, 
    resolvers,
    context: () => ({mongoDataMethods})
})
const app = express();
server.start().then(res => {
 server.applyMiddleware({ app });
 app.listen({ port: 4000 }, () =>
     console.log('Now browse to http://localhost:4000' + server.graphqlPath)
 )
})