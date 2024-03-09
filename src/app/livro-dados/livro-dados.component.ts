import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Editora } from '../editora';
import { ControleEditoraService } from '../controle-editora.service';
import { ControleLivrosService } from '../controle-livros.service';
import { Livro } from '../livro';

@Component({
  selector: 'app-livro-dados',
  templateUrl: './livro-dados.component.html',
  styleUrls: ['./livro-dados.component.css']
})
export class LivroDadosComponent implements OnInit {
  titulo: string = '';
  resumo: string = '';
  codEditora: number = 0;
  autoresForm: string = '';
  editoras: Editora[] = [];

  constructor(
    private servEditora: ControleEditoraService,
    private servLivros: ControleLivrosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editoras = this.servEditora.getEditoras();
  }

  incluir(): void {
    const livro: Livro = {
      codigo: 0,
      titulo: this.titulo,
      resumo: this.resumo,
      codEditora: parseInt(this.codEditora.toString()), 
      autores: this.autoresForm.split('\n')
    };
    this.servLivros.incluir(livro);
    this.router.navigateByUrl('/lista');
  }
  
  
  selecionarEditora(event: any): void {
    console.log('Editora selecionada:', event.target.value);
  }

  obterNome(codEditora: number): string {
    return this.servEditora.getNomeEditora(codEditora);
  }
}
