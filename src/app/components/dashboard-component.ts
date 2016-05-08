import { Component, OnInit} from "angular2/core";
import {Claimant} from "../classes/claimant";
import {ClaimantService} from "../services/claimant.service";
import { Router } from 'angular2/router';
import {HTTP_PROVIDERS} from "angular2/http";
@Component({
  selector: 'my-dashboard',
  providers: [],
  templateUrl: 'app/components/dashboard.component.html',
})

//export class DashboardComponent { }

export class DashboardComponent implements OnInit {
   claimants: Claimant[];
    constructor(private claimantService: ClaimantService) { }
  ngOnInit() {
    this.claimantService.getClaimants().subscribe(
        claimants => this.claimants = claimants,
        error => console.log("Some error, yo: " + error)
      );

  }
  gotoDetail(){ /* not implemented yet */}
}
