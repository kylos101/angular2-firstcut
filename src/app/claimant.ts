
///<reference path="../../node_modules/angular2/typings/browser.d.ts"/> 

import {Component} from 'angular2/core'; // i.e. get Component functionality from core.js in the angular2 library

// a contract for Claimants
interface Claimant {
    id: number;
    name: string;
}

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
*/ 
@Component({
    selector: 'claimant',
    template: `
        <h1>{{claimant.title}}</h1>
        <h2>{{claimant.name}} details!</h2>
        <div><label>id: </label>{{claimant.id}}</div>
        <div>
            <label>name: </label>
            <input [(ngModel)]="claimant.name" placeholder="name">
        </div>
    `
})

// This is an example of a component that can be "imported"" by other parts of the application (because we export it)
export class ClaimantComponent {  
    public title = 'Claimant form'           
    public claimant: Claimant = {
        id: 101,
        name: 'Kyle Brennan'    
    }    
}