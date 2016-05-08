
import {Component} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from "angular2/router";
import {ClaimantService} from "../services/claimant.service";
import {ClaimantsComponent} from "./claimants";
import {DashboardComponent} from "./dashboard-component";
import {HTTP_PROVIDERS} from "angular2/http";

/*
this includes a directives attribute, which tells angular to look for new
elements. W/o it, it would ignore the <claimant-detail> in the mark-up, and it
would not render it OR throw errors.

the prefix * is an indicator (to the developer) that the <li> element and
its children are a master template

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
/*  <a [routerLink]="['Dashboard']">Dashboard</a>
    <claimants></claimants>


*/
@Component({
    selector: "my-app",
    directives: [ROUTER_DIRECTIVES],
    providers: [ClaimantService,HTTP_PROVIDERS,ROUTER_PROVIDERS],
    templateUrl: 'app/components/page.component.html'
})
@RouteConfig([
  {
    path: '/claimants',
    name: 'Claimants',
    component: ClaimantsComponent
  },
  {
  path: '/dashboard',
  name: 'Dashboard',
  component: DashboardComponent,
  useAsDefault: true
}
])
export class AppComponent {
  title = "Claimants";
}
