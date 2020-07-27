import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private validadores: ValidadoresService
  ) {
    this.crearFormulario();
    this.cargarDataAlFormulario();
    this.crearListeners();
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

  get usuarioInvalido(){
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched;
  }

  get distritoInvalido(){
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched;
  }

  get ciudadInvalido(){
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched;
  }

  get pass1Invalido(){
    return this.forma.get('password1').invalid && this.forma.get('password1').touched;
  }

  get pass2Invalido(){
    const pass1 = this.forma.get("password1").value;
    const pass2 = this.forma.get("password2").value;

    return (pass1 === pass2) ? false : true;

  }

  crearFormulario(){
    this.forma = this.formBuilder.group({
      //valor por defecto // sync validator // async validator
      nombre:['', [Validators.required, Validators.minLength(5)]],
      //Validacion sincrona personalizada. Se manda es la referencia a la funcion, no se invoca la misma (no se ponen parentesis)
      apellido:['', [Validators.required, Validators.minLength(5), this.validadores.noHerrera]],
      correo:['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      usuario:['', , this.validadores.existeUsuario],
      password1:['', [Validators.required]],
      password2:['', [Validators.required]],
      direccion:this.formBuilder.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required]
      }),
      pasatiempos: this.formBuilder.array([])
    },{
      validators: [this.validadores.passwordsIguales('password1','password2')]
    });
  }

  crearListeners(){
    // this.forma.valueChanges.subscribe(valor =>{
    //   console.log(valor)
    // });

    // this.forma.statusChanges.subscribe(status => console.log(status));

    this.forma.get('nombre').valueChanges.subscribe(console.log);
  }

  cargarDataAlFormulario(){
    // this.forma.setValue(//Con setValue se tienen que mandar todos los valores obligatoriamente o da error, no importa si estan en blanco, tiene que estar
    this.forma.reset( //Con reset se pueden mandar valores por defecto y no tienen que ser todos los campos
      {
        nombre: 'Maria',
        apellido: 'Perez',
        correo: 'mperez@gmail.com',
        password1:'123',
        password2:'123',
        direccion: {
          distrito: 'Ontario',
          ciudad: 'Ottawa'
        }
      }
    );
//Cargar un array dinamicamente con valores estaticos
    //['Comer', 'Dormir'].forEach(valor => this.pasatiempos.push(this.formBuilder.control(valor,[Validators.required])))
  }

  guardar(){
    if (this.forma.invalid){
      this.forma.markAllAsTouched();
      return;
    }
    console.log(this.forma.value);

    this.forma.reset();
  }

  agregarPasatiempo(){
    this.pasatiempos.push(this.formBuilder.control('', [Validators.required]))
  }

  borrarPasatiempo(i: number){
    this.pasatiempos.removeAt(i);
  }

}
