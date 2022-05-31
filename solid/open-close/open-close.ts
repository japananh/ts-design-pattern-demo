// Open to extension
// Close to modification

export class ErrorHandler {
    private messageBox: any
    private httpClient: any;

    constructor(messageBox, httpClient) {
        this.messageBox = messageBox
        this.httpClient = httpClient
    }

    wrapError(err, publicRes, serverity) {
        let error = {
            originalErr: err,
            publicRes,
            serverity
        }

        // Refactor: Unit test might fail because of this line
        this.httpClient.post("/api/log", error)

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

export class MessageBox{
    show(msg) {
        alert(msg)
    }
}

const msgBox = new MessageBox()
class HttpClient {}
const httpClient = new HttpClient()
const err = new ErrorHandler(msgBox, httpClient)
err.wrapError(new Error("app error"), "app error", 4)