// Open to extension
// Close to modification

export class ErrorHandler {
    private messageBox: any

    constructor(messageBox) {
        this.messageBox = messageBox
    }

    wrapError(err, publicRes, serverity) {
        if (serverity < 5) {
            this.handleWarning("warning", publicRes)
        } else {
            this.handleError("critical error", publicRes)
        }
    }

    private handleWarning(header, content) {
        this.messageBox.show(header, content)
    }
    private handleError(header, content) {
        this.messageBox.show(header, content)
    }
}

export class ErrorLogger {
    private endpoint: string = "api/log";
    constructor(private _httpClient) {
    }

    logError(errObj) {
        this._httpClient.post(this.endpoint, errObj)
    }

}

export class ErrHandlerWithLogging extends ErrorHandler {
    private _logger: any;

    constructor(msgBox, logger) {
        super(msgBox)
        this._logger = logger
    }

    wrapError(err, publicRes, serverity) {
        this._logger.logError(err).then(_ => {
            super.wrapError(err, publicRes, serverity);
        })
    }
}

export class MessageBox{
    show(msg) {
        alert(msg)
    }
}

const msgBox = new MessageBox()
class HttpClient {}
const httpClient = new HttpClient()
const logger = new ErrorLogger(httpClient)
const err = new ErrHandlerWithLogging(msgBox, logger)
err.wrapError(new Error("app error"), "app error", 4)