import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as usuarios from "../actions";
import {catchError, map, mergeMap, of, tap} from "rxjs";
import {UsuarioService} from "../../services/usuario.service";


@Injectable()
export class UsuariosEffects {
  constructor(private actions$: Actions,
              private usuariosServices: UsuarioService) {
  }

  cargarUsuarios$ = createEffect(
    () => this.actions$.pipe(
      ofType(usuarios.cargarUsuarios),
      mergeMap(
        () => this.usuariosServices.getUsers().pipe(
          map(users => usuarios.cargarUsuariosSuccess({usuarios: users})),
          catchError((err) => of(usuarios.cargarUsuariosError({payload: err})))
        )
      )
    )
  )
}
