import { RouterModule, Routes } from '@angular/router';
import { PessoasComponent } from './pessoas/pessoas.component';
import { ColigadosComponent } from './coligados/coligados.component';
import { ParceirosComponent } from './parceiros/parceiros.component';
import { ColigadoComponent } from "./coligados/coligado/coligado.component";
import { ParceiroComponent } from "./parceiros/parceiro/parceiro.component";
import { PessoaComponent } from "./pessoas/pessoa/pessoa.component";
import { ManuelCordeiroNetoComponent } from "./manuel-cordeiro-neto/manuel-cordeiro-neto.component";

const appRoutes: Routes = [
    { path: 'pessoas', component: PessoasComponent },
    { path: 'coligados', component: ColigadosComponent },
    { path: 'parceiros', component: ParceirosComponent },
    { path: 'coligado', component: ColigadoComponent },
    { path: 'coligados/:id', component: ColigadoComponent },
    { path: 'parceiro', component: ParceiroComponent },
    { path: 'parceiros/:id', component: ParceiroComponent },
    { path: 'pessoa', component: PessoaComponent },
    { path: 'pessoas/:id', component: PessoaComponent },
    { path: 'manuel-cordeiro-neto', component: ManuelCordeiroNetoComponent}
];

export const routing = RouterModule.forRoot(appRoutes);