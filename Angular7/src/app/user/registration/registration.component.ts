import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService) { }

  ngOnInit() {
    this.service.formModel.reset();

  }

  onSubmit(){
    this.service.register().subscribe(
      (res:any) =>{
        if(res.succeeded){
          this.service.formModel.reset();
        }
        else{
          res.errors.forEach(element => {
              switch (element.code) {
                case 'DuplicateUserName':
                  //Username is already taken
                  break;
              
                default:
                  //Registration is failed
                  break;
              }
          });
        }
      },
      err =>{
        console.log(err);
      }
    );
  }

}
