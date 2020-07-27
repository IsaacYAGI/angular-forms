import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

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
    this.cargarDataAlFormulario();
   }

  ngOnInit(): void {
  }

  get pasatiempos(){
    return this.forma.get('pasatiempos') as FormArray;
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

  get distritoInvalido(){
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched;
  }

  get ciudadInvalido(){
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched;
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
      }),
      pasatiempos: this.formBuilder.array([
        [],[],[],[],[],
      ])
    });
  }

  cargarDataAlFormulario(){
    // this.forma.setValue(//Con setValue se tienen que mandar todos los valores obligatoriamente o da error, no importa si estan en blanco, tiene que estar
    this.forma.reset( //Con reset se pueden mandar valores por defecto y no tienen que ser todos los campos
      {
        nombre: 'Maria',
        apellido: 'Perez',
        correo: 'mperez@gmail.com',
        direccion: {
          distrito: 'Ontario',
          ciudad: 'Ottawa'
        }
      }
    )
  }

  guardar(){
    if (this.forma.invalid){
      this.forma.markAllAsTouched();
      return;
    }
    console.log(this.forma.value);

    this.forma.reset();
  }

}
