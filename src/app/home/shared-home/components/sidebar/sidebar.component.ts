import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteConstants } from 'src/app/core/constants/route.constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  redirectToDashborad() {
    this.router.navigate([RouteConstants.DASHBOARD]);
  }
}
