// The dependency inversion principle: classes and modules should depend on abstractions instead of concrete implementations
// abstractions = interfaces
import * as fs from "fs"

export interface Post {
    id: number
    title: string
    body: string
    postedBy: string
}

// `IPostService` define how `Post` might work
export interface IPostService {
    getAll(): Promise<Post[]>
    save(post: Post): Promise<void>
}

export class PostService implements IPostService {
    private _filePath: string = "./solid/dependency-inversion/posts.json"

    constructor() {}

    getAll(): Promise<Post[]> {
        return new Promise((resolve, reject) => {
            fs.readFile(this._filePath, "utf8", (err, data) => {
                if (err) {
                    reject(err)
                }
                resolve(data && JSON.parse(data))
            })
        })
    }

    save(post: Post): Promise<void> {
        return new Promise((resolve, reject) => {
            this.getAll().then(posts => {
                posts.push(post)
                fs.writeFile(this._filePath, JSON.stringify(posts), err => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                })
            })
        })
    }
}

export class NewsFeed {
    constructor(private _service: IPostService) {}

    show() {
        this._service.getAll().then(posts => {
            posts.forEach(post => console.log(post.title, "-", post.body))
        })
    }
}

let newsFeed = new NewsFeed(new PostService())
newsFeed.show()
