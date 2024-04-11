// my code

const mongoose = require('mongoose')
const { Schema } = mongoose

const testSchema = new Schema({
    field_one: String,
    field_two: Number
})

const testModel = mongoose.model('test', testSchema)

module.exports = { testModel }

// 