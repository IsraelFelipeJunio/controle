import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Empresa } from '../../model/empresa';
import { TipoPessoa } from '../../model/tipo-pessoa';
import { EmpresaService } from '../../service/empresa.service';
import { ViaCepService } from '../../service/via-cep.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html'
})
export class EmpresaComponent {

  // NG SELECT EMPRESA PAI
  subjectEmpresaPai: Subject<string> = new Subject<string>();
  empresas: Empresa[] = [];

  empresaFormGroup: FormGroup = Empresa.criarFormulario(new Empresa());

  constructor(private activatedRoute: ActivatedRoute,
              private toastrService: ToastrService,
              private router: Router,
              private empresaService: EmpresaService,
              private viaCepService: ViaCepService) {


    if (this.activatedRoute.snapshot.paramMap.get('id') !== 'novo') {

      this.empresaService.consultarPorId(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(empresa => {

        this.empresaFormGroup =  Empresa.criarFormulario(empresa);
      });
    }


    // NG SELECT EMPRESA PAI
    this.subjectEmpresaPai.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(ret => {
        return this.empresaService.consultarEmpresaPai(ret, this.empresaFormGroup!.get('id')!.value);
      }),
    ).subscribe(dados => {
      this.empresas = dados;
    });
    this.subjectEmpresaPai.next('');
   
  }

  salvar() {

    if (this.empresaFormGroup!.get('tipoPessoa')!.value === TipoPessoa.FISICA) {
      this.empresaFormGroup!.get('cnpj')!.clearValidators();
      this.empresaFormGroup!.get('cnpj')!.updateValueAndValidity();
    }

    if (this.empresaFormGroup!.get('tipoPessoa')!.value === TipoPessoa.JURIDICA) {
      this.empresaFormGroup!.get('cpf')!.clearValidators();
      this.empresaFormGroup!.get('cpf')!.updateValueAndValidity();
    }

    // if (this.empresaFormGroup.invalid) {
    //   this.toastrService.error('Favor preencher todos os campos obrigatórios.');
    //   return;
    // }

    this.empresaService.salvar(this.empresaFormGroup.value).subscribe(c => {
      this.toastrService.success('Empresa Salva');
      this.router.navigate(['/empresa']);
    });

  }

  excluir(){

    this.empresaService.excluir(this.empresaFormGroup.value.id).subscribe(c => {

      this.toastrService.success('Empresa Excluída');
      this.router.navigate(['/empresa']);
    });
  }

  consultarCep(){

    if(this.empresaFormGroup!.get('cep')!.value==null){
      this.empresaFormGroup!.get('cep')!.setValue(null);
      this.empresaFormGroup!.get('endereco')!.setValue(null);
      this.empresaFormGroup!.get('bairro')!.setValue(null);
      this.empresaFormGroup!.get('complemento')!.setValue(null);
      this.empresaFormGroup!.get('numero')!.setValue(null);
      this.empresaFormGroup!.get('cidade')!.setValue(null);
      this.empresaFormGroup!.get('uf')!.setValue(null);
      this.empresaFormGroup!.get('ibge')!.setValue(null);
      this.empresaFormGroup!.get('gia')!.setValue(null);
      this.empresaFormGroup!.get('ddd')!.setValue(null);
      this.empresaFormGroup!.get('siafi')!.setValue(null);
      return;
    }

    if(this.empresaFormGroup!.get('cep')!.value==''){
      this.empresaFormGroup!.get('cep')!.setValue(null);
      this.empresaFormGroup!.get('endereco')!.setValue(null);
      this.empresaFormGroup!.get('bairro')!.setValue(null);
      this.empresaFormGroup!.get('complemento')!.setValue(null);
      this.empresaFormGroup!.get('numero')!.setValue(null);
      this.empresaFormGroup!.get('cidade')!.setValue(null);
      this.empresaFormGroup!.get('uf')!.setValue(null);
      this.empresaFormGroup!.get('ibge')!.setValue(null);
      this.empresaFormGroup!.get('gia')!.setValue(null);
      this.empresaFormGroup!.get('ddd')!.setValue(null);
      this.empresaFormGroup!.get('siafi')!.setValue(null);
      return;
    }

    if(this.empresaFormGroup!.get('cep')!.value!.length!=8){
      this.empresaFormGroup!.get('cep')!.setValue(null);
      this.empresaFormGroup!.get('endereco')!.setValue(null);
      this.empresaFormGroup!.get('bairro')!.setValue(null);
      this.empresaFormGroup!.get('complemento')!.setValue(null);
      this.empresaFormGroup!.get('numero')!.setValue(null);
      this.empresaFormGroup!.get('cidade')!.setValue(null);
      this.empresaFormGroup!.get('uf')!.setValue(null);
      this.empresaFormGroup!.get('ibge')!.setValue(null);
      this.empresaFormGroup!.get('gia')!.setValue(null);
      this.empresaFormGroup!.get('ddd')!.setValue(null);
      this.empresaFormGroup!.get('siafi')!.setValue(null);
      this.toastrService.error('CEP inválido');
      return;
    }

    this.viaCepService.consultarCep(this.empresaFormGroup!.get('cep')!.value).subscribe(value => {

      if(value.erro){
        this.empresaFormGroup!.get('cep')!.setValue(null);
        this.empresaFormGroup!.get('endereco')!.setValue(null);
        this.empresaFormGroup!.get('bairro')!.setValue(null);
        this.empresaFormGroup!.get('complemento')!.setValue(null);
        this.empresaFormGroup!.get('numero')!.setValue(null);
        this.empresaFormGroup!.get('cidade')!.setValue(null);
        this.empresaFormGroup!.get('uf')!.setValue(null);
        this.empresaFormGroup!.get('ibge')!.setValue(null);
        this.empresaFormGroup!.get('gia')!.setValue(null);
        this.empresaFormGroup!.get('ddd')!.setValue(null);
        this.empresaFormGroup!.get('siafi')!.setValue(null);
        this.toastrService.error('CEP inválido');
        return;
      }

      this.empresaFormGroup!.get('bairro')!.setValue(value.bairro);
      this.empresaFormGroup!.get('endereco')!.setValue(value.logradouro);
      this.empresaFormGroup!.get('complemento')!.setValue(value.complemento);
      this.empresaFormGroup!.get('numero')!.setValue(null);
      this.empresaFormGroup!.get('cidade')!.setValue(value.localidade);
      this.empresaFormGroup!.get('uf')!.setValue(value.uf);
      this.empresaFormGroup!.get('ibge')!.setValue(value.ibge);
      this.empresaFormGroup!.get('gia')!.setValue(value.gia);
      this.empresaFormGroup!.get('ddd')!.setValue(value.ddd);
      this.empresaFormGroup!.get('siafi')!.setValue(value.siafi);
    })
  }

  consultarEmpresas(term: any) {
    this.subjectEmpresaPai.next(term.term);
  }

}
