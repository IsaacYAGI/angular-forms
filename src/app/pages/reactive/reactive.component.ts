import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.crearFormulario();
   }

  ngOnInit(): void {
  }

  crearFormulario(){
    this.forma = this.formBuilder.group({
      //valor por defecto // sync validator // async validator
      nombre:[''],
      apellido:[''],
      correo:[''],
    });
  }

  guardar(){
    console.log(this.forma)
  }

}
