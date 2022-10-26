import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/user';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  role: string = '';

  user: User = new User();
  userAdmin: User = new User();
  roles: string[];

  constructor(private authService: AuthService, private route: Router) {
    this.roles = [
      'admin',
      'user'
    ]
  }

  ngOnInit(): void {
    this.username = '';
    this.password = '';
  }

  newFunction(){
    this.userAdmin.username = 'admin';
    this.userAdmin.password= '123456';
    this.userAdmin.role = 'admin';

    this.authService.login(this.user).subscribe(res => {
      if (res == null) {
        alert("username or password is wrong");
        this.ngOnInit();
      } else {
        console.log("Login successful");
        localStorage.setItem("token", res.token);

        if (this.role == 'user') {
          this.route.navigate(['/home']);
        }

        if (this.role == 'admin') {
          this.route.navigate(['/admin']);
        }
      }
    }, err => {

      alert("Login failed")
      this.ngOnInit();
    })
  }

  login() {
    this.user.username = this.username;
    this.user.password = this.password;
    this.user.role = this.role;

    this.authService.login(this.user).subscribe(res => {
      if (res == null) {
        alert("username or password is wrong");
        this.ngOnInit();
      } else {
        console.log("Login successful");
        localStorage.setItem("token", res.token);

        if (this.role == 'user') {
          this.route.navigate(['/home']);
        }

        if (this.role == 'admin') {
          this.route.navigate(['/admin']);
        }
      }
    }, err => {

      alert("Login failed")
      this.ngOnInit();
    })
  }

}
