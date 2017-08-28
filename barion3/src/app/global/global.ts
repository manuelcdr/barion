import { Observable } from 'rxjs';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/startWith';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from "@angular/core";

@Injectable()
export class AppGlobals {
    // use this property for property binding
    public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    setLoginStatus(isLoggedIn: boolean) {
        this.isUserLoggedIn.next(isLoggedIn);
    }

}