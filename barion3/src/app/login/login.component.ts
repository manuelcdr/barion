import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from "@angular/router";
import { AppGlobals } from "../global/global";
import { LoginService } from "./login.service";
import { Loader } from "../global/helpers";

declare var Materialize: any;
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: string;
  senha: string;

  service: LoginService;
  route: ActivatedRoute;
  router: Router;
  globals: AppGlobals;
  returnUrl: string = '';

  constructor(service: LoginService, route: ActivatedRoute, router: Router, global: AppGlobals) {
    this.service = service;
    this.route = route;
    this.router = router;
    this.globals = global;
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }


  onSubmit(event: any) {

    Loader.show();

    this.service
      .login(this.login, this.senha)
      .subscribe(
      retorno => {
        this.globals.setLoginStatus(true);
        this.router.navigateByUrl(this.returnUrl);
      },
      erro => {
        console.log(erro);
        Loader.hide();
        Materialize.toast("Login ou Senha incorretos", 5000);
      },
      () => Loader.hide()
      );
  }

}
