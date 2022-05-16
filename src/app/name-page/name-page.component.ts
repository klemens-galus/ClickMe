import { Component,Input ,OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-name-page',
  templateUrl: './name-page.component.html',
  styleUrls: ['./name-page.component.css']
})
export class NamePageComponent implements OnInit {

  setNameForm = this._formBuilder.group({
    name: ''
  });
  constructor(private _formBuilder: FormBuilder, private _router: Router) { }


  ngOnInit(): void {
    
  }

  setName() { //ajout du nom dans la session de l'utilisateur et redirection vers l'accueil
    sessionStorage.setItem('name', this.setNameForm.value.name);
    this._router.navigate(['/'])

  }

}
