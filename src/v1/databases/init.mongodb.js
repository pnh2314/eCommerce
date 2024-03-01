import mongoose from 'mongoose'

const CONNECTION_STRING = process.env.MONGODB_URI || 'mongodb://localhost:27017'

// singleton pattern
export default class Database {
  constructor() {
    if (!Database.instance) {
      this.connect()
      Database.instance = this
      return Database.instance
    }
  }

  connect() {
    mongoose
      .connect('mongodb://localhost:27017')
      .then(() => console.log('A mongodb connection is established!'))
      .catch(e => console.log('Connection error!', e))

    if (true) {
      mongoose.set('debug', true)
      mongoose.set('debug', { color: true })
    }
  }
}
