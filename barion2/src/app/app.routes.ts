import { RouterModule, Routes } from '@angular/router';
import { PessoasComponent } from './pessoas/pessoas.component';
import { ColigadosComponent } from './coligados/coligados.component';
import { ParceirosComponent } from './parceiros/parceiros.component';
import { ColigadoComponent } from "./coligados/coligado/coligado.component";

const appRoutes: Routes = [
    { path: 'pessoas', component: PessoasComponent },
    { path: 'coligados', component: ColigadosComponent },
    { path: 'parceiros', component: ParceirosComponent },
    { path: 'coligado', component: ColigadoComponent },
    { path: 'coligados/:id', component: ColigadoComponent },
];

export const routing = RouterModule.forRoot(appRoutes);