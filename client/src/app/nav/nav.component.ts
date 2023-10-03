import { Component } from '@angular/core';
import { ContaService } from '../_services/conta.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent {
  model: any = {}

  constructor(public contaService: ContaService) { }

  ngOnInit(): void {
  }

  login() {
    this.contaService.login(this.model).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => console.log(error)
    })
  }

  logout() {
    this.contaService.logout();
  }
}
