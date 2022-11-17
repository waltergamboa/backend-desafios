const pino = require('pino')
require("dotenv").config();

function buildProdLogger() {
  const prodLogger = pino('./src/helpers/logger/debug.log');
  prodLogger.level = 'debug'
  return prodLogger
}

function buildDevLogger() {
  const devLogger = pino('./src/helpers/logger/info.log')
  devLogger.level = 'info'
  return devLogger
}

function buildDevLoggerWarn() {
    const devLogger = pino('./src/helpers/logger/warn.log')
    devLogger.level = 'warn'
    return devLogger
  }

  function buildDevLoggerError() {
    const devLogger = pino('./src/helpers/logger/error.log')
    devLogger.level = 'error'
    return devLogger
  }  

let logger = null
let loggerWarn = null
let loggerError = null

if (process.env.NODE_ENV === 'production') {
  logger = buildProdLogger()
} else {
  logger = buildDevLogger()
  loggerWarn = buildDevLoggerWarn()
  loggerError = buildDevLoggerError()
}

module.exports = { logger, loggerWarn, loggerError }