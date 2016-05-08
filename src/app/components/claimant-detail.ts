
import {Component, Input} from "angular2/core"; // i.e. get Component functionality from core.js in the angular2 library
import {Claimant} from "../classes/claimant";
import {ClaimantService} from "../services/claimant.service";
/*
Summary
 @Component references Component (above), which we imported
 @Component is a decorator function that takes a metadata object, which tells Angular how to create and use the component
 selector is a property for a CSS selector, for an HTML element that represents the component
 template is a set of HTML, and references the class properties...

Details
 no "template" property is specified on @Component (which would include HTML), because the underlying component,
  Angular2, has a related template templateUrl (HTML it'll need/use)

 the template property must use backsticks, `, not single quotes '.

 this component supports two way binding (which is why ngModel is being used). if we just wanted to display the
 value for the context hero, we'd have something like input value="{{claimant.name}}"

 ngModel is a built in "directive". remember [()] or ...banana in a box... when using directives!

 *nfIf evaluates an expression, and only renders to the DOM if the result is true...claimant is truthy if
 the consumer class sets it.
*/
@Component({
    selector: "claimant-detail",
    template: `
      <form *ngIf="active" (ngSubmit)="onSubmitted()"  #claimantDelForm="ngForm">
        <div *ngIf="claimant">
          <h1>{{title}}</h1>
          <div>
            <label>id: </label>{{claimant.Id}}
          </div>
          <div>
              <label>name: </label>
              <input type="text" [(ngModel)]="claimant.Name" placeholder="name">
          </div>
          <div>
            <label> nickname: {{claimant.Nickname}}</label>
          </div>
            <div>
              <button type="button" class="btn btn-default"
              (click)="deleteClaimant()"
              [disabled]="!claimantDelForm.form.valid">Delete Claimant</button>
            </div>
        </div>
        </form>
    `
})

// This is an example of a component that can be "imported"" by other parts of the application (because we export it)
export class ClaimantDetailComponent {
  constructor(private _claimantService: ClaimantService) {
  }
    title = "Claimant Info";
    active = true;

    @Input() // this is a decorator...in other words this class expects the consumer to set the context claimant
    claimant: Claimant;
    submitted = false;

      deleteClaimant() {
           this.active = false;
           this._claimantService.deleteClaimant(this.claimant.Id)
            .subscribe(
              claimant => claimant,
              error => console.log("Some error, yo: " + error)
            );
            setTimeout(() => this.active = true, 0); // hack, but Angular recommends it until there's a proper reset method
          //  window.location.reload();
      }
      onSubmitted() {
           this.submitted = true;
      }
}
