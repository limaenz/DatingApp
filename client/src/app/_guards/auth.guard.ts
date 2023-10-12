import { CanActivateFn } from '@angular/router';
import { ContaService } from '../_services/conta.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const contaService = inject(ContaService);
  const toastr = inject(ToastrService);
  
  return contaService.usuarioAtual$.pipe(
    map(usuario => {
      if (usuario) return true;
      else {
        toastr.error('Você não tem permissão para acessar!');
        return false;
      }
    })
  )
};