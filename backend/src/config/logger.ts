import winston, { createLogger, format, transports } from 'winston'

const consoleLog = new transports.Console()
const options = {
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }): string => {
            return `${timestamp} | ${level} | ${message}`
        })
    ),
    transports: [
        consoleLog
    ],
    exceptionHandlers: [
        consoleLog
    ],
    exitOnError: false
}

if (process.env.NODE_ENV === "production") {
    winston.remove(consoleLog)
    winston.add(new transports.File({ filename: 'error.log' }))
}

const logger = createLogger(options)

export default logger