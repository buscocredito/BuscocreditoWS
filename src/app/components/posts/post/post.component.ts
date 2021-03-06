import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { PostService } from '../post.service'
import { Observable } from 'rxjs';
import { PostI } from 'src/app/shared/models/post.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(private route: ActivatedRoute, private postSvc: PostService, private db: AngularFirestore,private authSvc: AuthService) { }

  public post$: Observable<PostI>;

  // Variables for select options
  plazoOfrecer = "";
  usuarioEmail: string;
  // Variables to save user data
  datos: any[] = [];
  emailPropuesta: string = ''

  onLogout(): void {
    firebase.auth().signOut().then(function () {
    }).catch(function (error) {
    });
  }

  setData(idPost) {
    const formBid = document.querySelector('#formBid');
    formBid.addEventListener('submit', (e) => {
      e.preventDefault();
      let montoOfrecido = (<HTMLInputElement>document.querySelector('#montoOfrecido')).value;
      let tasaAnualOfrecer = (<HTMLInputElement>document.querySelector('#tasaAnualOfrecer')).value;
      let comisionApertura = (<HTMLInputElement>document.querySelector('#comisionApertura')).value;
      let precioSeguroVida = (<HTMLInputElement>document.querySelector('#precioSeguroVida')).value;
      let amortizacion = (<HTMLInputElement>document.querySelector('#amortizacion')).value;

      const idPropuesta = this.db.createId();
      this.db.collection("propuestas").doc(`${idPropuesta}`).set({
        oferta: true,
        emailPropuesta: this.emailPropuesta,
        montoOfrecido: montoOfrecido,
        plazoOfrecido: this.plazoOfrecer,
        tasaAnualOfrecer: tasaAnualOfrecer,
        comisionApertura: comisionApertura,
        precioSeguroVida: precioSeguroVida,
        amortizacion: amortizacion
      })
        .then(function () {
          console.log("Document successfully written!");
          Swal.fire("Propuesta Enviada");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
    })
    

    
  }

  ngOnInit(): void {
    const idPost = this.route.snapshot.params.id;
    this.post$ = this.postSvc.getOnePost(idPost);
    //this.setData(idPost)
    this.setData(idPost);
    this.getData(idPost)
    

    this.authSvc.userData$.subscribe((user) => {
      this.initValuesForm(user);
      this.usuarioEmail = user.email;
      console.log(this.usuarioEmail)
    });

  }

  public profileForm = new FormGroup({
    emailEmpresa: new FormControl({ value: '', disabled: true }, Validators.required),
  });

  private initValuesForm(user): void {
    this.profileForm.patchValue({
      emailEmpresa: user.email
    });
  }

  getData(idPost) {
    this.db
      .collection("posts")
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          this.datos.push(doc.data());
          if(doc.data().id === idPost){
            this.emailPropuesta = doc.data().email;

            console.log(this.emailPropuesta)
          }
        });
      });
  }


}
