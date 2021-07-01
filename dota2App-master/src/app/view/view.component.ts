import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  matchId = "4252379739"
  result: any;
  radiantVictory: boolean;
  victory: string = "";
  skill: string = "";

  colorBar1 = 'warn';
  modeBar1 = 'determinate';
  valueBar1 = 50;

  colorBar2 = 'primary';
  modeBar2 = 'determinate';
  valueBar2 = 50;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.getRouteId();
  }

  getRouteId() {
    const routeId = +this.route.snapshot.paramMap.get('id');
    this.matchId = routeId.toString();
    if (this.matchId == "0") {
      this.matchId = "4252379739";
    }
    else {
      this.getMatchData();
    }
  }
  getMatchData() {
    this.location.go("/match-details/"+this.matchId);
    this.http.get("https://api.opendota.com/api/matches/" + this.matchId).subscribe((matchData) => {
      this.result = matchData;
      console.log(this.result);
      this.victoryFunction(this.result.radiant_win);
      this.skillFunction(this.result.skill);
      // console.log(this.result.skill);
      this.ratioFunctionBar1(this.result.barracks_status_radiant,this.result.barracks_status_dire);
      this.ratioFunctionBar2(this.result.tower_status_radiant,this.result.tower_status_dire);
    });
  }
  victoryFunction(radiantVictoryBoolean) {
    if (radiantVictoryBoolean == true) {
      this.victory = "Radiant Victory";
    }
    else {
      this.victory = "Dire Victory";
    }
  }
  skillFunction(skillLevelInteger) {
    if (skillLevelInteger == 0) {
      this.skill = "Below Average"
    }
    else if (skillLevelInteger == 1) {
      this.skill = "Average"
    }
    else if (skillLevelInteger == 2) {
      this.skill = "Above Average skill"
    }
    else if (skillLevelInteger == 3) {
      this.skill = "High skill"
    }
    else {
      this.skill = "???";
    }
  }
  
  ratioFunctionBar1(radiant,dire){
    this.valueBar1 = 100*(parseInt(radiant)/(parseInt(radiant) + parseInt(dire)));
  }
  
  ratioFunctionBar2(radiant,dire){
    this.valueBar2 = 100*(parseInt(radiant)/(parseInt(radiant) + parseInt(dire)));
  }

}
