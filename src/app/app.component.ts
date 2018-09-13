import {Component} from '@angular/core'
import {Menu, menu} from './cheeses'
// import {Menu, menu} from './pastas-1-interface'
// import {Menu, menu} from './pastas-2-type'
// import {Menu, menu} from './pastas-3-sauces'
// import {Menu, menu} from './pastas-4-farfalle'
// import {Menu, menu} from './x-cheese-prices-via-map'
// import {Menu, menu} from './x-pastas-classes'
// import {Menu, menu} from './x-prices-in-interfaces'

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})

export class AppComponent  {
  menu: Menu = menu
}
