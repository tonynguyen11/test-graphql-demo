const Club = require('../models/club')
const Player = require('../models/player')
const { modelName } = require('../models/club')

const mongoDataMethods = {
    getAllPlayers: async (condition = null) => 
    condition === null ? await Player.find() : await Player.find(condition),
    getPlayerById: async id => await Player.findById(id),
    getAllClubs: async () => await Club.find(),
    getClubById: async id => await Club.findById(id),
    addClub: async args => {
        const newClub = new Club(args)
        return await newClub.save() 
    },
    addPlayer: async args =>{
        const newPlayer = new Player(args)
        return await newPlayer.save()
    }
}

module.exports = mongoDataMethods