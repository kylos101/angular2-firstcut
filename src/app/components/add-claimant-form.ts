
import {Component, Input} from "angular2/core";
import {Claimant} from "../classes/claimant";
import {HTTP_PROVIDERS} from "angular2/http";
import {ClaimantService} from "../services/claimant.service";

@Component({
    selector: "add-claimant",
    template: `
        <form *ngIf="active" (ngSubmit)="onSubmitted()" #claimantForm="ngForm">
          <h1>{{title}}</h1>
          <h2>{{claimant.Name}} details!</h2>

          <div class="form-group">
              <label for="Name">Name</label>
              <input type="text" class="form-control" required
              [(ngModel)]="claimant.Name"
              ngControl="Name"
              >
          </div>

          <div class="form-group">
              <label for="Nickname">Nickname</label>
              <input type="text" class="form-control" required
              [(ngModel)]="claimant.Nickname"
              ngControl="Nickname"
              >
          </div>

          <div>
            <button type="button" class="btn btn-default"
            (click)="addClaimant()"
            [disabled]="!claimantForm.form.valid">Add Claimant</button>
          </div>
        </form>
    `
})

export class AddClaimantComponent  {
  constructor(private _claimantService: ClaimantService) {
    this.claimant = new Claimant();
  }

  title = "Add a Claimant";

  claimant: Claimant;
  active = true;
  submitted = false;

  addClaimant() {
       this.active = false;
       this._claimantService.addClaimant(this.claimant.Name, this.claimant.Nickname)
        .subscribe(
          claimant => claimant,
          error => console.log("Some error, yo: " + error));
        // we aren't doing anything with the error...just an FYI.
        // https://angular.io/docs/ts/latest/guide/server-communication.html

       setTimeout(() => this.active = true, 0); // hack, but Angular recommends it until there's a proper reset method

      //  this._heroService.addHero(name)
      //              .subscribe(
      //                hero  => this.heroes.push(hero),
      //                error =>  this.errorMessage = <any>error);
  }
  onSubmitted() {
    this.submitted = true;
  }
}
