import { Component, OnInit } from '@angular/core';
import {LexRuntime}  from 'aws-sdk';
import { environment } from 'src/environments/environment.';
import {Message} from '../messages';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  
  constructor() { }

  lex: LexRuntime;
  userInput: string = "";
  messages: Message[] = [];
  lexResponse: string ="Hi, what would you like to do?";

  waiting:boolean = false
  
  ngOnInit() {
    this.messages.push(new Message(this.lexResponse,"Bot"));
  }

  postLexText() {
    var params = {
      botAlias: 'PredictNationalityA', /* required */
      botName: 'PredictNameNationality', /* required */
      inputText: 'Testing', /* required */
      userId: 'User', /* required */
      // requestAttributes: {
      //   '<String>': 'STRING_VALUE',
      //   /* '<String>': ... */
      // },
      // sessionAttributes: {
      //   '<String>': 'STRING_VALUE',
      //   /* '<String>': ... */
      // }
    };

    this.lex = new LexRuntime({
      accessKeyId: "AKIAWO4IMAD7AVB5CZF4",
      secretAccessKey: "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",
      region: "us-east-1"
    }
    );
    params.inputText= this.userInput;
    this.lex.postText(params, (err, data)=>{
      if (err){
        console.log(err, err.stack); // an error occurred
      }
      else {
        console.log("adrita:" , data) // successful response
        this.lexResponse = data.message;
      }
      this.messages.push(new Message(this.userInput,"User"));
        this.userInput="";
      this.messages.push(new Message(this.lexResponse,"Bot"));
    });
  }

}
