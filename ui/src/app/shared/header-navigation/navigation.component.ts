import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Empresa } from '../../model/empresa';
import { EmpresaService } from '../../service/empresa.service';
import { UsuarioService } from '../../service/usuario.service';

declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit {

  // NG SELECT EMPRESA
  subjectEmpresa: Subject<string> = new Subject<string>();
  empresas: Empresa[] = [];

  empresaFormGroup: FormGroup = new FormGroup({
    empresa: new FormControl( null,Validators.required)
  });

  @Output() toggleSidebar = new EventEmitter<void>();

  public config: PerfectScrollbarConfigInterface = {};

  public showSearch = false;

  public usuarioLogado;
  public modalTrocaUsuario;

  constructor(private modalService: NgbModal,
              private usuarioService: UsuarioService,
              private empresaService: EmpresaService) {

    this.usuarioService.usuarioLogado().subscribe(usuarioLogado => {

      this.usuarioLogado = usuarioLogado;
    });

    // EMPRESA
    this.subjectEmpresa.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(ret => {
        return this.empresaService.consultarSelect(ret);
      }),
    ).subscribe(dados => {
      this.empresas = dados;
    });
    this.subjectEmpresa.next('');

  }

  consultarEmpresa(term: any) {

    this.subjectEmpresa.next(term.term);
  }

  trocarEmpresa(){

    this.usuarioService.alterarEmpresa(this.empresaFormGroup.value.empresa,this.usuarioLogado).subscribe(value => {
      window.location.reload();
    });
  }

  open1(content1:string) {

    this.modalTrocaUsuario = this.modalService.open(content1, {ariaLabelledBy: 'modal-basic-title',centered: true});
  }

  // This is for Notifications
  notifications: Object[] = [
    {
      btn: 'btn-danger',
      icon: 'ti-link',
      title: 'Luanch Admin',
      subject: 'Just see the my new admin!',
      time: '9:30 AM'
    },
    {
      btn: 'btn-success',
      icon: 'ti-calendar',
      title: 'Event today',
      subject: 'Just a reminder that you have event',
      time: '9:10 AM'
    },
    {
      btn: 'btn-info',
      icon: 'ti-settings',
      title: 'Settings',
      subject: 'You can customize this template as you want',
      time: '9:08 AM'
    },
    {
      btn: 'btn-primary',
      icon: 'ti-user',
      title: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  // This is for Mymessages
  mymessages: Object[] = [
    {
      useravatar: 'assets/images/users/1.jpg',
      status: 'online',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:30 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'busy',
      from: 'Sonu Nigam',
      subject: 'I have sung a song! See you at',
      time: '9:10 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'away',
      from: 'Arijit Sinh',
      subject: 'I am a singer!',
      time: '9:08 AM'
    },
    {
      useravatar: 'assets/images/users/4.jpg',
      status: 'offline',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  ngAfterViewInit() {}
}
