import { Component, OnInit } from '@angular/core';
import { Usuario } from './_models/usuario';
import { ContaService } from './_services/conta.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dating app';

  constructor(private contaService: ContaService) { }

  ngOnInit(): void {
    this.defineUsuarioAtual();
  }

  defineUsuarioAtual() {
    const usuarioString = localStorage.getItem('usuario');
    if (!usuarioString) 
      return;
    
    const usuario: Usuario = JSON.parse(usuarioString);
    this.contaService.defineUsuarioAtual(usuario);
  }
}