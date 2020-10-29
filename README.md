## Built by and for developers ❤️

## Features
  * Passwordless sign in
  * Linking of Social Logins on Account dashboard
  * Google Material design
  * PWA(Progressive Web app)
  * Firebase CRUD
  * Protected Routes with Authorization  

  ## Installation

* `git clone https://github.com/MMHossaini/Angular.git`
* `cd Angular`
* `npm install`
* `npm start`
* visit http://localhost:4200

### How to create a new module
`ng g m <ModuleName> --module app --route <Route>`  `app` is the root module.
# App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.0.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Test cases
Not doing any uni tests at the moment, but these are the requirments

1. When page loads, if uesr is not logged in, they should be forwareded to login page, else to home
2. If a login link is expired. the login page should display a message to the user
## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
