import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as usuarios from "../actions";
import {catchError, map, mergeMap, of, tap} from "rxjs";
import {UsuarioService} from "../../services/usuario.service";


@Injectable()
export class UsuarioEffects {
  constructor(private actions$: Actions,
              private usuariosServices: UsuarioService) {
  }

  cargarUsuario$ = createEffect(
    () => this.actions$.pipe(
      ofType(usuarios.cargarUsuario),
      mergeMap(
        (action) => this.usuariosServices.getUserById(action.id).pipe(
          map(user => usuarios.cargarUsuarioSuccess({usuario: user})),
          catchError((err) => of(usuarios.cargarUsuarioError({payload: err})))
        )
      )
    )
  )
}
