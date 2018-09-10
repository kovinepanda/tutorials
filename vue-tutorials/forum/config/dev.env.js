'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const firebaseEnv = require('./firebase.env')

module.exports = merge(firebaseEnv, prodEnv, {
  NODE_ENV: '"development"'
})
