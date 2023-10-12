import { Component } from '@angular/core';
import { ContaService } from '../_services/conta.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent {
  model: any = {}

  constructor(public contaService: ContaService, private router: Router,
     private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  login() {
    this.contaService.login(this.model).subscribe({
      next: _ => this.router.navigateByUrl('/members'),
      error: error => {
        this.toastr.error(error.error);
        console.log(error);
      } 
    })
  }

  logout() {
    this.contaService.logout();
    this.router.navigateByUrl('/');
  }
}
