import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  get nombreInvalido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  get apellidoInvalido(){
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
  }

  get correoInvalido(){
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }

  crearFormulario(){
    this.forma = this.formBuilder.group({
      //valor por defecto // sync validator // async validator
      nombre:['', [Validators.required, Validators.minLength(5)]],
      apellido:['', [Validators.required, Validators.minLength(5)]],
      correo:['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      direccion:this.formBuilder.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required]
      })
    });
  }

  guardar(){
    if (this.forma.invalid){
      this.forma.markAllAsTouched();
      return;
    }
    console.log(this.forma.value)
  }

}
