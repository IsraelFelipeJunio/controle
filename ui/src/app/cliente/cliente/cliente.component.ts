import {Component} from '@angular/core';
import {ClienteService} from '../../service/cliente.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormGroup} from '@angular/forms';
import {Cliente} from '../../model/cliente';
import {ToastrService} from 'ngx-toastr';
import {Contato} from '../../model/contato';
import {ViaCepService} from '../../service/via-cep.service';
import {TipoPessoa} from '../../model/tipo-pessoa';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html'
})
export class ClienteComponent {

  clienteFormGroup: FormGroup = new Cliente().criarFormulario(new Cliente());

  constructor(private activatedRoute: ActivatedRoute,
              private toastrService: ToastrService,
              private router: Router,
              private clienteService: ClienteService,
              private viaCepService: ViaCepService) {


    if (this.activatedRoute.snapshot.paramMap.get('id') !== 'novo') {

      this.clienteService.consultarPorId(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(cliente => {

        this.clienteFormGroup = new Cliente().criarFormulario(cliente);

        if (cliente!.contatos!.length == 0) {
          this.novoContato();
        }
      });

    } else {

      const control = <FormArray>this.clienteFormGroup.controls['contatos'];
      control.push(Contato.criarFormulario(new Contato()));
    }

  }

  salvar() {

    if (this.clienteFormGroup!.get('tipoPessoa')!.value === TipoPessoa.FISICA) {
      this.clienteFormGroup!.get('cnpj')!.clearValidators();
      this.clienteFormGroup!.get('cnpj')!.updateValueAndValidity();
    }

    if (this.clienteFormGroup!.get('tipoPessoa')!.value === TipoPessoa.JURIDICA) {
      this.clienteFormGroup!.get('cpf')!.clearValidators();
      this.clienteFormGroup!.get('cpf')!.updateValueAndValidity();
    }

    if (this.clienteFormGroup.invalid) {
      this.toastrService.error('Favor preencher todos os campos obrigatórios.');
      return;
    }

    this.excluirContatosEmBranco();

    this.clienteService.salvar(this.clienteFormGroup.value).subscribe(c => {

      this.toastrService.success('Cliente Salvo');
      this.router.navigate(['/cliente']);
    });

  }

  excluir() {

    this.clienteService.excluir(this.clienteFormGroup.value.id).subscribe(c => {

      this.toastrService.success('Cliente Excluído');
      this.router.navigate(['/cliente']);
    });
  }

  consultarCep(){

    if(this.clienteFormGroup!.get('cep')!.value==null){
      this.clienteFormGroup!.get('cep')!.setValue(null);
      this.clienteFormGroup!.get('endereco')!.setValue(null);
      this.clienteFormGroup!.get('bairro')!.setValue(null);
      this.clienteFormGroup!.get('complemento')!.setValue(null);
      this.clienteFormGroup!.get('numero')!.setValue(null);
      this.clienteFormGroup!.get('cidade')!.setValue(null);
      this.clienteFormGroup!.get('uf')!.setValue(null);
      this.clienteFormGroup!.get('ibge')!.setValue(null);
      this.clienteFormGroup!.get('gia')!.setValue(null);
      this.clienteFormGroup!.get('ddd')!.setValue(null);
      this.clienteFormGroup!.get('siafi')!.setValue(null);
      return;
    }

    if(this.clienteFormGroup!.get('cep')!.value==''){
      this.clienteFormGroup!.get('cep')!.setValue(null);
      this.clienteFormGroup!.get('endereco')!.setValue(null);
      this.clienteFormGroup!.get('bairro')!.setValue(null);
      this.clienteFormGroup!.get('complemento')!.setValue(null);
      this.clienteFormGroup!.get('numero')!.setValue(null);
      this.clienteFormGroup!.get('cidade')!.setValue(null);
      this.clienteFormGroup!.get('uf')!.setValue(null);
      this.clienteFormGroup!.get('ibge')!.setValue(null);
      this.clienteFormGroup!.get('gia')!.setValue(null);
      this.clienteFormGroup!.get('ddd')!.setValue(null);
      this.clienteFormGroup!.get('siafi')!.setValue(null);
      return;
    }

    if(this.clienteFormGroup!.get('cep')!.value!.length!=8){
      this.clienteFormGroup!.get('cep')!.setValue(null);
      this.clienteFormGroup!.get('endereco')!.setValue(null);
      this.clienteFormGroup!.get('bairro')!.setValue(null);
      this.clienteFormGroup!.get('complemento')!.setValue(null);
      this.clienteFormGroup!.get('numero')!.setValue(null);
      this.clienteFormGroup!.get('cidade')!.setValue(null);
      this.clienteFormGroup!.get('uf')!.setValue(null);
      this.clienteFormGroup!.get('ibge')!.setValue(null);
      this.clienteFormGroup!.get('gia')!.setValue(null);
      this.clienteFormGroup!.get('ddd')!.setValue(null);
      this.clienteFormGroup!.get('siafi')!.setValue(null);
      this.toastrService.error('CEP inválido');
      return;
    }

    this.viaCepService.consultarCep(this.clienteFormGroup!.get('cep')!.value).subscribe(value => {

      if(value.erro){
        this.clienteFormGroup!.get('cep')!.setValue(null);
        this.clienteFormGroup!.get('endereco')!.setValue(null);
        this.clienteFormGroup!.get('bairro')!.setValue(null);
        this.clienteFormGroup!.get('complemento')!.setValue(null);
        this.clienteFormGroup!.get('numero')!.setValue(null);
        this.clienteFormGroup!.get('cidade')!.setValue(null);
        this.clienteFormGroup!.get('uf')!.setValue(null);
        this.clienteFormGroup!.get('ibge')!.setValue(null);
        this.clienteFormGroup!.get('gia')!.setValue(null);
        this.clienteFormGroup!.get('ddd')!.setValue(null);
        this.clienteFormGroup!.get('siafi')!.setValue(null);
        this.toastrService.error('CEP inválido');
        return;
      }

      this.clienteFormGroup!.get('bairro')!.setValue(value.bairro);
      this.clienteFormGroup!.get('endereco')!.setValue(value.logradouro);
      this.clienteFormGroup!.get('complemento')!.setValue(value.complemento);
      this.clienteFormGroup!.get('numero')!.setValue(null);
      this.clienteFormGroup!.get('cidade')!.setValue(value.localidade);
      this.clienteFormGroup!.get('uf')!.setValue(value.uf);
      this.clienteFormGroup!.get('ibge')!.setValue(value.ibge);
      this.clienteFormGroup!.get('gia')!.setValue(value.gia);
      this.clienteFormGroup!.get('ddd')!.setValue(value.ddd);
      this.clienteFormGroup!.get('siafi')!.setValue(value.siafi);
    })
  }

  contatos(): FormArray {

    return this.clienteFormGroup.get('contatos') as FormArray;
  }

  novoContato() {

    const control = <FormArray>this.clienteFormGroup.controls['contatos'];
    control.push(Contato.criarFormulario(new Contato()));
  }

  excluirContato(index: any) {

    const control = <FormArray>this.clienteFormGroup.controls['contatos'];
    control.removeAt(index);
  }

  excluirContatosEmBranco() {

    const control = <FormArray>this.clienteFormGroup.controls['contatos'];

    let listExcluir: Array<any> = [];

    control.controls.forEach((value, index) => {

      if ((value.value.nome == null || value.value.nome == '') &&
        (value.value.email == null || value.value.email == '') &&
        (value.value.fone == null || value.value.fone == '') &&
        (value.value.cargo == null || value.value.cargo == '')) {

        listExcluir.push(value);
      }
    });

    listExcluir.forEach(value => {

      control.controls.forEach((item, index) => {

        if (item === value) {
          control.removeAt(index);
        }
      });

    });
    control.updateValueAndValidity();
  }


}
