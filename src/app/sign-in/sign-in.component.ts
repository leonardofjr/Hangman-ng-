import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgZone } from '@angular/core'

declare var FB: any;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  title = 'Hangman';
  loginStatus: boolean = false;

  constructor(private _ngZone: NgZone, private router: Router) { }


  ngOnInit() {


  }

  submitLogin(el) {
    console.log("submit login to facebook");
    // FB.login();
    FB.login((response) => {
      console.log('submitLogin', response);
      if (response.authResponse) {
        localStorage.setItem('token', response.authResponse.accessToken);
        console.log(el);
        this.showLogoutBtn();
        this.loginStatus = true;

        this.graphAPI(response.authResponse.userID);
        //login success
        //login success code here
        //redirect to home page
        this._ngZone.run(() => {
          this.router.navigateByUrl('game');
        }

        )}
      else {
        console.log('User login failed');
      }
    });

  }

  showLogoutBtn() {
    document.getElementById('logoutBtn').classList.remove('d-none');
  }

  graphAPI(userId) {
    /* make the API call */
    FB.api(
      userId,
      function (response) {
        if (response && !response.error) {
          console.log(response);
        }
      }
    );
  }


}
