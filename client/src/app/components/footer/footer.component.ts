import { Component } from '@angular/core';
import { HelpComponent } from '../help/help.component';
import { AboutComponent } from '../about/about.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
