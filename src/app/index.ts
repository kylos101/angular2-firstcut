// reference is needed in order for Typescript to access the "typings" for angular...
///<reference path="../../node_modules/angular2/typings/browser.d.ts"/> 

/*
 Quick start notes
 https://angular.io/docs/ts/latest/quickstart.html
 */

// import classes (the things in {}) from libraries (files)
import {bootstrap} from 'angular2/platform/browser';
import {ClaimantComponent} from './claimant';

bootstrap(ClaimantComponent);