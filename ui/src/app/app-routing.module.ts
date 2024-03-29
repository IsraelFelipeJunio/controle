import { Routes } from '@angular/router';

import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './service/auth-guard';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/dashboard/classic', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboards/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'starter',
        loadChildren: () => import('./starter/starter.module').then(m => m.StarterModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule),
        canActivate: [AuthGuard]
      },
      { path: 'cards', loadChildren: () => import('./cards/cards.module').then(m => m.CardsModule) , canActivate: [AuthGuard] },
      { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) , canActivate: [AuthGuard]},
      { path: 'forms', loadChildren: () => import('./form/forms.module').then(m => m.FormModule) , canActivate: [AuthGuard]},
      { path: 'tables', loadChildren: () => import('./table/tables.module').then(m => m.TablesModule) , canActivate: [AuthGuard]},




      { path: 'projeto', loadChildren: () => import('./projeto/projeto.module').then(m => m.ProjetoModule) , canActivate: [AuthGuard]},
      { path: 'categoria', loadChildren: () => import('./categoria/categoria.module').then(m => m.CategoriaModule) , canActivate: [AuthGuard]},
      { path: 'unidade-medida', loadChildren: () => import('./unidade-medida/unidade-medida.module').then(m => m.UnidadeMedidaModule) , canActivate: [AuthGuard]},
      { path: 'recurso', loadChildren: () => import('./recurso/recurso.module').then(m => m.RecursoModule) , canActivate: [AuthGuard]},
      { path: 'tarefa', loadChildren: () => import('./tarefa/tarefa.module').then(m => m.TarefaModule) , canActivate: [AuthGuard]},
      { path: 'empresa', loadChildren: () => import('./empresa/empresa.module').then(m => m.EmpresaModule) , canActivate: [AuthGuard]},
      { path: 'empresa', loadChildren: () => import('./empresa/empresa.module').then(m => m.EmpresaModule) , canActivate: [AuthGuard]},
      { path: 'usuario', loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule) , canActivate: [AuthGuard]},

      { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartModule) , canActivate: [AuthGuard]},
      {
        path: 'widgets',
        loadChildren: () => import('./widgets/widgets.module').then(m => m.WidgetsModule)
        , canActivate: [AuthGuard]
      },
      { path: 'ecom', loadChildren: () => import('./ecommerce/ecom.module').then(m => m.EcomModule), canActivate: [AuthGuard] },
      {
        path: 'timeline',
        loadChildren: () => import('./timeline/timeline.module').then(m => m.TimelineModule)
        , canActivate: [AuthGuard]
      },
      {
        path: 'extra-component',
        loadChildren:
          () => import('./extra-component/extra-component.module').then(m => m.ExtraComponentModule)
        , canActivate: [AuthGuard]
      },
      { path: 'apps', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule), canActivate: [AuthGuard] },
      { path: 'apps/email', loadChildren: () => import('./apps/email/mail.module').then(m => m.MailModule), canActivate: [AuthGuard] },
      { path: 'maps', loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule), canActivate: [AuthGuard] },
      {
        path: 'sample-pages',
        loadChildren: () => import('./sample-pages/sample-pages.module').then(m => m.SamplePagesModule)
        , canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren:
          () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
      }
    ]
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'login',
        loadChildren:
          () => import('./login/login.module').then(m => m.LoginModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/authentication/404'
  }
];
