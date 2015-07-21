import winston from 'winston';

function makeLogger (path) {
  if(path.match(/request.js$/)) {
    let transports = [
      new winston.transports.Console({
        timestamp: true,
        colorize: true,
        level: 'info'
      }),

      new winston.transports.File({filename: 'debug.log', level: 'debug'})
    ];

    return new winston.Logger({transports: transports});
  } else {
    return new winston.Logger({transports: []});
  }
}

export default (module) => makeLogger(module.filename);
