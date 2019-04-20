import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';
declare var FB: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Hangman';
  loginStatus:boolean = false;
  ngOnInit() {

    (window as any).fbAsyncInit = function () {
      FB.init({
        appId: '456804481528314',
        cookie: true,
        xfbml: true,
        version: 'v3.2'
      });
      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  }

  submitLogin(el) {
    console.log("submit login to facebook");
    // FB.login();
    FB.login((response) => {
      console.log('submitLogin', response);
      if (response.authResponse) {
        this.hideLoginBtn();
        this.showLogoutBtn();
        console.log(el);
        this.loginStatus = true;
        this.graphAPI(response.authResponse.userID);
        //login success
        //login success code here
        //redirect to home page
      }
      else {
        console.log('User login failed');
      }
    });

  }
  hideLogoutBtn() {
    document.getElementById('logoutBtn').style.display = "none";

  }
  showLogoutBtn() {
    document.getElementById('logoutBtn').style.display = "block";

  }
  showLoginBtn() {
    document.getElementById('loginBtn').style.display = "block";
  }
  hideLoginBtn() {
    document.getElementById('loginBtn').style.display = "none";
  }
  logout() {
    let _self = this;
    FB.logout(function(response) {
      if (response) {
        _self.loginStatus = false;
        _self.showLoginBtn();
        _self.hideLogoutBtn();
        console.log('logout', response)
      }

    })
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