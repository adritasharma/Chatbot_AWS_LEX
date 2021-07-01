export class ChatMessage {
    constructor(public content: string, public sender: Sender) { }
}

export enum Sender {
    Bot,
    User
}