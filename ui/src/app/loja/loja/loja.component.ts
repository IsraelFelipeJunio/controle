import {Component} from '@angular/core';
import {LojaService} from '../../service/loja.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {Loja} from '../../model/loja';
import {ToastrService} from 'ngx-toastr';
import {ViaCepService} from '../../service/via-cep.service';
import {TipoPessoa} from '../../model/tipo-pessoa';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-loja',
  templateUrl: './loja.component.html'
})
export class LojaComponent {

  lojaFormGroup: FormGroup = Loja.criarFormulario(new Loja());

  constructor(private activatedRoute: ActivatedRoute,
              private toastrService: ToastrService,
              private router: Router,
              private lojaService: LojaService,
              private viaCepService: ViaCepService) {


    if (this.activatedRoute.snapshot.paramMap.get('id') !== 'novo') {

      this.lojaService.consultarPorId(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(loja => {

        this.lojaFormGroup =  Loja.criarFormulario(loja);
      });
    }
   
  }

  salvar() {

    if (this.lojaFormGroup!.get('tipoPessoa')!.value === TipoPessoa.FISICA) {
      this.lojaFormGroup!.get('cnpj')!.clearValidators();
      this.lojaFormGroup!.get('cnpj')!.updateValueAndValidity();
    }

    if (this.lojaFormGroup!.get('tipoPessoa')!.value === TipoPessoa.JURIDICA) {
      this.lojaFormGroup!.get('cpf')!.clearValidators();
      this.lojaFormGroup!.get('cpf')!.updateValueAndValidity();
    }

    if (!this.lojaFormGroup.get('vendeProduto').value && !this.lojaFormGroup.get('vendeServico').value ) {
      this.toastrService.error('Favor preencher todos os campos obrigatórios.');
      return;
    }

    if (this.lojaFormGroup.invalid) {
      this.toastrService.error('Favor preencher todos os campos obrigatórios.');
      return;
    }

    this.lojaService.salvar(this.lojaFormGroup.value).subscribe(c => {

      this.toastrService.success('Loja Salva');
      this.router.navigate(['/loja']);
    });

  }

  excluir(){

    this.lojaService.excluir(this.lojaFormGroup.value.id).subscribe(c => {

      this.toastrService.success('Loja Excluída');
      this.router.navigate(['/loja']);
    });
  }

  consultarCep(){

    if(this.lojaFormGroup!.get('cep')!.value==null){
      this.lojaFormGroup!.get('cep')!.setValue(null);
      this.lojaFormGroup!.get('endereco')!.setValue(null);
      this.lojaFormGroup!.get('bairro')!.setValue(null);
      this.lojaFormGroup!.get('complemento')!.setValue(null);
      this.lojaFormGroup!.get('numero')!.setValue(null);
      this.lojaFormGroup!.get('cidade')!.setValue(null);
      this.lojaFormGroup!.get('uf')!.setValue(null);
      this.lojaFormGroup!.get('ibge')!.setValue(null);
      this.lojaFormGroup!.get('gia')!.setValue(null);
      this.lojaFormGroup!.get('ddd')!.setValue(null);
      this.lojaFormGroup!.get('siafi')!.setValue(null);
      return;
    }

    if(this.lojaFormGroup!.get('cep')!.value==''){
      this.lojaFormGroup!.get('cep')!.setValue(null);
      this.lojaFormGroup!.get('endereco')!.setValue(null);
      this.lojaFormGroup!.get('bairro')!.setValue(null);
      this.lojaFormGroup!.get('complemento')!.setValue(null);
      this.lojaFormGroup!.get('numero')!.setValue(null);
      this.lojaFormGroup!.get('cidade')!.setValue(null);
      this.lojaFormGroup!.get('uf')!.setValue(null);
      this.lojaFormGroup!.get('ibge')!.setValue(null);
      this.lojaFormGroup!.get('gia')!.setValue(null);
      this.lojaFormGroup!.get('ddd')!.setValue(null);
      this.lojaFormGroup!.get('siafi')!.setValue(null);
      return;
    }

    if(this.lojaFormGroup!.get('cep')!.value!.length!=8){
      this.lojaFormGroup!.get('cep')!.setValue(null);
      this.lojaFormGroup!.get('endereco')!.setValue(null);
      this.lojaFormGroup!.get('bairro')!.setValue(null);
      this.lojaFormGroup!.get('complemento')!.setValue(null);
      this.lojaFormGroup!.get('numero')!.setValue(null);
      this.lojaFormGroup!.get('cidade')!.setValue(null);
      this.lojaFormGroup!.get('uf')!.setValue(null);
      this.lojaFormGroup!.get('ibge')!.setValue(null);
      this.lojaFormGroup!.get('gia')!.setValue(null);
      this.lojaFormGroup!.get('ddd')!.setValue(null);
      this.lojaFormGroup!.get('siafi')!.setValue(null);
      this.toastrService.error('CEP inválido');
      return;
    }

    this.viaCepService.consultarCep(this.lojaFormGroup!.get('cep')!.value).subscribe(value => {

      if(value.erro){
        this.lojaFormGroup!.get('cep')!.setValue(null);
        this.lojaFormGroup!.get('endereco')!.setValue(null);
        this.lojaFormGroup!.get('bairro')!.setValue(null);
        this.lojaFormGroup!.get('complemento')!.setValue(null);
        this.lojaFormGroup!.get('numero')!.setValue(null);
        this.lojaFormGroup!.get('cidade')!.setValue(null);
        this.lojaFormGroup!.get('uf')!.setValue(null);
        this.lojaFormGroup!.get('ibge')!.setValue(null);
        this.lojaFormGroup!.get('gia')!.setValue(null);
        this.lojaFormGroup!.get('ddd')!.setValue(null);
        this.lojaFormGroup!.get('siafi')!.setValue(null);
        this.toastrService.error('CEP inválido');
        return;
      }

      this.lojaFormGroup!.get('bairro')!.setValue(value.bairro);
      this.lojaFormGroup!.get('endereco')!.setValue(value.logradouro);
      this.lojaFormGroup!.get('complemento')!.setValue(value.complemento);
      this.lojaFormGroup!.get('numero')!.setValue(null);
      this.lojaFormGroup!.get('cidade')!.setValue(value.localidade);
      this.lojaFormGroup!.get('uf')!.setValue(value.uf);
      this.lojaFormGroup!.get('ibge')!.setValue(value.ibge);
      this.lojaFormGroup!.get('gia')!.setValue(value.gia);
      this.lojaFormGroup!.get('ddd')!.setValue(value.ddd);
      this.lojaFormGroup!.get('siafi')!.setValue(value.siafi);
    })
  }

}
