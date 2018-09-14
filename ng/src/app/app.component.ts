import {Component} from '@angular/core'
import {menu} from './cheeses'
// import {menu} from './pastas-1-interface'
// import {menu} from './pastas-2-type'
// import {menu} from './pastas-3-sauces'
// import {menu} from './pastas-4-farfalle'
// import {menu} from './x-pastas-no-enum'
// import {menu} from './x-cheese-prices-via-map'
// import {menu} from './x-pastas-classes'
// import {menu} from './x-prices-in-interfaces'

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})

export class AppComponent  {
  menu = menu
}
