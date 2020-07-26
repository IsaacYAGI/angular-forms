import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: "Maria",
    apellido: "Perez",
    correo: "mperez@gmail.com",
  }
  constructor(
    private paisService: PaisService
  ) { }

  ngOnInit(): void {
    this.paisService.getPaises().subscribe(paises =>{
      console.log(paises)
    })
  }

  guardar(forma: NgForm){
    if (forma.invalid){
      Object.values(forma.controls).forEach(control => control.markAsTouched());
      return;
    }
    console.log(forma.value)
  }
}
