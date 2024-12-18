import {Component, OnInit} from '@angular/core';
import {UsuarioService} from '../../services/usuario.service';
import {Usuario} from '../../models/usuario.model';
import {AppState} from "../../store/app.reducers";
import {Store} from "@ngrx/store";
import {cargarUsuarios} from "../../store/actions";

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
})
export class ListaComponent implements OnInit {
  usuarios: Usuario[] = []
  loading: boolean = false;
  error: any;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    // this.userService.getUser().subscribe(res =>  this.usuarios=res)

    this.store.select('usuarios').subscribe(({users, loading, error}) => {
      this.usuarios = users
      this.loading = loading
      this.error = error
    })
    this.store.dispatch(cargarUsuarios());


  }
}
