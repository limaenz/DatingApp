import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Usuario } from '../_models/usuario';

@Injectable({
  providedIn: 'root'
})
export class ContaService {
  baseUrl = `https://localhost:5001/api/`;
  private usuarioAtualFonte = new BehaviorSubject<Usuario | null>(null);
  usuarioAtual$ = this.usuarioAtualFonte.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post<Usuario>(this.baseUrl + 'conta/login', model).pipe(
      map((response: Usuario) => {
        const usuario = response;

        if (usuario) {
          localStorage.setItem('usuario', JSON.stringify(usuario));
          this.usuarioAtualFonte.next(usuario);
        }
      })
    )
  }

  register(model: any) {
    return this.http.post<Usuario>(this.baseUrl + 'conta/registrar', model).pipe(
      map(usuario => {
        if (usuario) {
          localStorage.setItem('usuario', JSON.stringify(usuario));
          this.usuarioAtualFonte.next(usuario);
        }
      })
    )
  }

  defineUsuarioAtual(usuario: Usuario) {
    this.usuarioAtualFonte.next(usuario);
  }

  logout() {
    localStorage.removeItem('usuario');
    this.usuarioAtualFonte.next(null);
  }
}