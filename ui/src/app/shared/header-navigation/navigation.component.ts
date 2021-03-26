import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
  NgbPanelChangeEvent,
  NgbCarouselConfig
} from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {UsuarioService} from '../../service/usuario.service';
import {Subject} from 'rxjs';
import {Loja} from '../../model/loja';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {LojaService} from '../../service/loja.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Validador} from '../../core/validador';
declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit {

  // NG SELECT LOJA
  subjectLoja: Subject<string> = new Subject<string>();
  lojas: Loja[] = [];

  lojaFormGroup: FormGroup = new FormGroup({
    loja: new FormControl( null,Validators.required)
  });

  @Output() toggleSidebar = new EventEmitter<void>();

  public config: PerfectScrollbarConfigInterface = {};

  public showSearch = false;

  public usuarioLogado;
  public modalTrocaUsuario;

  constructor(private modalService: NgbModal,
              private usuarioService: UsuarioService,
              private lojaService: LojaService) {

    this.usuarioService.usuarioLogado().subscribe(usuarioLogado => {

      this.usuarioLogado = usuarioLogado;
    });

    // LOJA
    this.subjectLoja.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(ret => {
        return this.lojaService.consultarSelect(ret);
      }),
    ).subscribe(dados => {
      this.lojas = dados;
    });
    this.subjectLoja.next('');

  }

  consultarLoja(term: any) {

    this.subjectLoja.next(term.term);
  }

  trocarLoja(){

    this.usuarioService.alterarLoja(this.lojaFormGroup.value.loja,this.usuarioLogado).subscribe(value => {
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
