import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { Projeto } from './projeto';
import { ProjetoFase } from './projeto-fase';
import { Usuario } from './usuario';
import { ProjetoAtaReuniaoParticipante } from './projeto-ata-reuniao-participante';

export class ProjetoAtaReuniao {

  id: number | undefined;
  codigo: number | undefined;
  projeto: Projeto | undefined;
  projetoFase: ProjetoFase | undefined; //
  dataHora: string | undefined;
  ata: string | undefined;
  enviaEmail: boolean | undefined;
  tituloEmail: string | undefined;
  corpoEmail: string | undefined;
  projetoAtaReuniaoParticipantes: ProjetoAtaReuniaoParticipante [] | undefined;

  constructor() {
    this.enviaEmail = false;
    this.projetoAtaReuniaoParticipantes = [];
  }

  criarFormulario(projetoAtaReuniao: ProjetoAtaReuniao) {

    return new FormGroup({
      id: new FormControl(projetoAtaReuniao.id),
      codigo: new FormControl(projetoAtaReuniao.codigo, Validators.required),
      projeto: new FormControl(projetoAtaReuniao.projeto, Validators.required),
      projetoFase: new FormControl(projetoAtaReuniao.projetoFase),
      dataHora: new FormControl(projetoAtaReuniao.dataHora, Validators.required),
      ata: new FormControl(projetoAtaReuniao.ata, Validators.required),
      enviaEmail: new FormControl(projetoAtaReuniao.enviaEmail),
      tituloEmail: new FormControl(projetoAtaReuniao.tituloEmail),
      corpoEmail: new FormControl(projetoAtaReuniao.corpoEmail),
      projetoAtaReuniaoParticipantes: new FormArray(projetoAtaReuniao!.projetoAtaReuniaoParticipantes!.map(resp => ProjetoAtaReuniaoParticipante.criarFormulario(resp)))
    });
  }
  
}
