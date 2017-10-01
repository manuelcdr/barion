import { Observable } from 'rxjs';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/startWith';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from "@angular/core";

import * as configJson from 'assets/js/config.json';
let config = (<any>configJson);

@Injectable()
export class AppGlobals {
    // use this property for property binding
    public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(config.loginAutomatico);

    setLoginStatus(isLoggedIn: boolean) {
        this.isUserLoggedIn.next(isLoggedIn);
    }

    url : string = config.api.url;
    urlApi : string = config.api.urlApi;
    urlLogin : string = config.api.urlAuthentication;

}