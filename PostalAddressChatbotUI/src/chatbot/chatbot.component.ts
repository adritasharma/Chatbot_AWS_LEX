import { Component, OnInit } from '@angular/core';
import { LexRuntime } from 'aws-sdk';
import { ChatMessage, Sender } from 'src/app/models/Message';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  constructor() { }

  Sender = Sender
  lex: LexRuntime;
  userInput: string = "";
  messages: ChatMessage[] = [];
  lexResponse: string = "Hi, what would you like to do?";
  waiting: boolean = false

  ngOnInit() {
    this.messages.push(new ChatMessage(this.lexResponse, Sender.Bot));
  }

  postLexText() {

    this.waiting = true
    var params = {
      botAlias: environment.botAlias,
      botName: environment.botName,
      inputText: 'Testing',
      userId: 'User'
    };

    this.lex = new LexRuntime({
      accessKeyId: environment.accessKeyId,
      secretAccessKey: environment.secretAccessKey,
      region: environment.region
    }
    );
    params.inputText = this.userInput;
    this.lex.postText(params, (err, data) => {
      this.waiting = false
      if (err) {
        console.log(err, err.stack); // an error occurred
      }
      else {
        console.log("response:", data) // successful response
        this.lexResponse = data.message;
      }
      this.messages.push(new ChatMessage(this.userInput, Sender.User));
      this.userInput = "";
      this.messages.push(new ChatMessage(this.lexResponse, Sender.Bot));
    });
  }



}
