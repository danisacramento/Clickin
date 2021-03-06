import { Component, OnInit } from '@angular/core';
import { Globals } from '../model/Globals';
import { Usuario } from '../model/Usuario';
import { UsuarioService } from '../service/usuario.service';
import { InfoUsuario } from '../model/InfoUsuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfilpessoafisica',
  templateUrl: './perfilpessoafisica.component.html',
  styleUrls: ['./perfilpessoafisica.component.css']
})
export class PerfilpessoafisicaComponent implements OnInit {

  public infousuario: InfoUsuario;

  usuario: Usuario;

  constructor(public srv: UsuarioService, public router: Router) { }

  ngOnInit() {

    if(localStorage.getItem("MyToken")){

      this.srv.buscarInfo(localStorage.getItem("MyToken")).subscribe(
        (res: Usuario) => {
          
              Globals.user = res;
              this.usuario = new Usuario();
              this.usuario.nome = res.nome;
              this.usuario.idUsuario = res.idUsuario;
              this.recuperaInformacoesInfo();
              this.recuperaInformacoesUser();
        },   
      err => {
        alert("Erro ao inserir");
      });
    
  }else{
    alert("Você Precisa estar conectado para acessar essa página!")
    this.router.navigate(['/home']);
  }
  }

  public recuperaInformacoesInfo(){

    this.srv.recuperaInfoUsuario(this.usuario.idUsuario).subscribe(
      (res:InfoUsuario)=>{
        this.infousuario = res;
      },
      err=>{
        
      }
    )

  }

  public recuperaInformacoesUser(){

    this.srv.recuperaUsuario(this.usuario.idUsuario).subscribe(
      (res:Usuario)=>{
        this.usuario = res;
        this.usuario.telefone = res.telefone;
      },
      err=>{
        
      }
    )

  }

  public logout(){
    if(localStorage.getItem("MyToken")){
      localStorage.removeItem("MyToken");
      this.router.navigate(['/home']);
    }else{
    this.router.navigate(['/home']);
    }
  }

}