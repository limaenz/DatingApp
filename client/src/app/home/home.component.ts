import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  modoRegistrar = false;
  usuarios: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.obtemUsuarios();
  }

  alternarRegistro() {
    this.modoRegistrar = !this.modoRegistrar;
  }

  obtemUsuarios() {
    this.http.get('https://localhost:5001/api/usuarios').subscribe({
      next: response => this.usuarios = response,
      error: error => console.log(error),
      complete: () => console.log('Request realizado com sucesso.')
    })
  }
  cancelarModoRegistrar(evento: boolean) {
    this.modoRegistrar = evento;
  }
}
