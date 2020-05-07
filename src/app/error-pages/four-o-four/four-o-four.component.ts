import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteConstants } from 'src/app/core/constants/route.constants';

@Component({
  selector: 'app-four-o-four',
  templateUrl: './four-o-four.component.html',
  styleUrls: ['./four-o-four.component.scss']
})
export class FourOFourComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirectToHomePage() {
    this.router.navigate([RouteConstants.LOGIN])
  }

}
