
import {Component} from "angular2/core";
import {OnInit} from "angular2/core";

import {ClaimantDetailComponent} from "./claimant-detail";
import {AddClaimantComponent} from "./add-claimant-form";
import {ClaimantService} from "../services/claimant.service";
import {HTTP_PROVIDERS} from "angular2/http";

import {Claimant} from "../classes/claimant";

/*
this includes a directives attribute, which tells angular to look for new
elements. W/o it, it would ignore the <claimant-detail> in the mark-up, and it
would not render it OR throw errors.

the prefix * is an indicator (to the developer) that the <li> element and
its children are a master templa  te

the ngFor directive iterates over the heros array

the quoted text means take each claimant from claimants and make it available to
the corresponding template

the # prefix identifies the claimant as a local template variable. We can
reference to access a claimant's properties

style lifted and loaded from tour of heros quicstart; this is isolated to our
 component.

you'll notice a (click)...it binds to the <li> element's "click" event,
onSelect is method we have to implement...claimant is an input parameter

See the [class.selected]?
We’re saying “apply the selected class if the claimants match, remove it if they don’t”.
So, this is an example of conditionally setting a CSS class based on the evaluation of an expression.
*/
@Component({
    selector: "claimants",
    directives: [ClaimantDetailComponent, AddClaimantComponent],
    providers: [],
    template: `
        <h1>My claimants</h1>
        <div class="claimants container-fluid">
          <div *ngFor="#claimant of claimants" class="row">
            <input class="btn btn-primary" [(ngModel)]="claimant.Name" placeholder="name"
              [class.selected]="claimant === selectedClaimant"
              (click)="onSelect(claimant)"
            >
          </div>
        </div>
        <add-claimant>Loading...</add-claimant>
        <div>
          <claimant-detail [claimant]="selectedClaimant"></claimant-detail>
        </div>
    `
})

export class ClaimantsComponent implements OnInit  {
  constructor(private _claimantService: ClaimantService) {
    // update the claimant list array when adds or deletes are done
    this._claimantService.claimantList$.subscribe(
      theClaimants => {
        console.log("An update!");
        console.log(theClaimants);
        this.claimants = theClaimants;
      }, error => {
        console.log(error);
      }, () => {
        console.log("All complete.");
      }
    );
  }

  ngOnInit() {
    this.getClaimants();
  }

  // TODO: currently does nothing with error handling
  getClaimants() {
    this._claimantService.getClaimants()
      .subscribe(
        claimants => this.claimants = claimants);
  }

  // this is an uninitialized variable, an array of Claimants
  claimants: Claimant[];
  // this is an uninitialized variable, a type of Claimant (Claimant is an interface)
  selectedClaimant: Claimant;
  // an onSelect handler
  onSelect(claimant: Claimant) { this.selectedClaimant = claimant; }
}
