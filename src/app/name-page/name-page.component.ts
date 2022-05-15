import { Component,Input ,OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-name-page',
  templateUrl: './name-page.component.html',
  styleUrls: ['./name-page.component.css']
})
export class NamePageComponent implements OnInit {

  setNameForm = this.formBuilder.group({
    name: ''
  });
  constructor(private formBuilder: FormBuilder, private router: Router) { }


  ngOnInit(): void {
    
  }

  setName() {
    sessionStorage.setItem('name', this.setNameForm.value.name);
    this.router.navigate(['/'])

  }

}
