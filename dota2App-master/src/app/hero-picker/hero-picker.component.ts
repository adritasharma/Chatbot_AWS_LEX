import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location, KeyValue } from '@angular/common';
import {LexRuntime}  from 'aws-sdk';
import {Message} from '../messages';


@Component({
  selector: 'app-hero-picker',
  templateUrl: './hero-picker.component.html',
  styleUrls: ['./hero-picker.component.css']
})


export class HeroPickerComponent implements OnInit {

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private location: Location) { }

  heroData: Array<any>[] = [];
  heroDataStored: any;
  lex: LexRuntime;
  userInput: string = "";
  messages: Message[] = [];
  lexState: string ="Hi what would you like to do";

  selectedHeroes: Array<any>[] = [];
  bannedHeroes: Array<any>[] = [];
  heroMatchup: Array<any>[] = [];
  testMap = new Map();

  ngOnInit() {
    this.getHeroData();
    this.messages.push(new Message(this.lexState,"Bot"));

  }
  

  getHeroData() {
    this.http.get("https://api.opendota.com/api/heroes").subscribe((result) => {
        this.heroData = result as Array<any>[];
        this.heroDataStored = result;

        console.log(this.heroData)
        console.log(this.heroDataStored)

      });

  }
  getMatchupData(heroId) {
    this.http.get("https://api.opendota.com/api/heroes/" + heroId + "/matchups")
      .subscribe((result) => {
        this.heroMatchup = result as Array<any>[];
        console.log(this.heroMatchup);
        this.processMatchup(this.heroMatchup, this.heroDataStored);
      });
  }

  selectHero = function (hero) {
    const index = this.heroData.indexOf(hero);
    this.getMatchupData(hero.id);
    this.heroData.splice(index, 1);
    // console.log(index);
    this.selectedHeroes.splice(-1, 0, hero);
    // console.log(this.selectedHeroes);
  }
  banHero = function (hero) {
    const index = this.heroData.indexOf(hero);
    this.heroData.splice(index, 1);
    this.bannedHeroes.splice(-1, 0, hero);
  }
  undoEnemy = function (hero) {
    const index = this.selectedHeroes.indexOf(hero);
    this.selectedHeroes.splice(index, 1);
    this.heroData.splice(-1, 0, hero);
  }
  processMatchup(heromatchupData, heroDataStored) {
    var total = 0;
    heromatchupData.forEach(element => {
      total += parseInt(element.games_played)
    });
    heromatchupData.forEach(element => {
      var score = 0;
      score = 100 / 5 - (100 * parseInt(element.wins) / parseInt(element.games_played) / 5);
      var name = "";
      heroDataStored.forEach(hero => {
        if (parseInt(hero.id) == parseInt(element.hero_id)) {
          name = hero.localized_name;
        }
      });
      console.log(heroDataStored);
      if (name == "") {
        name = element.hero_id
      }
      if (this.testMap.has(name)) {
        this.testMap.set(name, this.testMap.get(name) + score);
      }
      else {
        this.testMap.set(name, score)
      }
      console.log(this.testMap);
    }
    );
  }
  postLexText() {
    var params = {
      botAlias: '\$LATEST', /* required */
      botName: 'OrderFlowersBot', /* required */
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
      accessKeyId: "AKIAJ43PBK7346OYWSCQ",
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
        console.log("adrita:" + data) // successful response
        this.lexState = data.message;
      }
      this.messages.push(new Message(this.userInput,"User"));
      this.messages.push(new Message(this.lexState,"Bot"));
    });
  }
}
