import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContaService } from '../_services/conta.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Output() cancelarRegistro = new EventEmitter();
  model: any = {};

  constructor(private contaService: ContaService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  register() {
    this.contaService.register(this.model).subscribe({
      next: () => {
        this.cancelar();
      },
      error: error => {
        this.toastr.error(error.error);
        console.log(error);
      }
    })
  }

  cancelar() {
    this.cancelarRegistro.emit(false);
  }
}
