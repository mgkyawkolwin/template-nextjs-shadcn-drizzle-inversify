class ConsoleLogger {
    private logLevels = {info:1, warning:2, error:3, debug:4};
    private logLevel = 0;

    constructor(){
        if(process.env.NODE_ENV === 'development' && process.env.CONSOLE_LOG_LEVEL){
            this.logLevel = parseInt(process.env.CONSOLE_LOG_LEVEL);
        }
    }

    public logDebug(message : string){
        if(this.logLevel === this.logLevels.debug)
            console.log('DEBUG: ' + message);
    }

    public logError(message : string){
        if(this.logLevel >= this.logLevels.error)
            console.log('ERROR: ' + message);
    }

    public logInfo(message : string){
        if(this.logLevel >= this.logLevels.info)
            console.log('INFO: ' + message);
    }

    public logWarning(message : string){
        if(this.logLevel >= this.logLevels.warning)
            console.log('WARN: ' + message);
    }
}

const consoleLogger = new ConsoleLogger();
export default consoleLogger;
