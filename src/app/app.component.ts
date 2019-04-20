import { Component, OnInit } from '@angular/core';
declare var FB: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Hangman';
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

  submitLogin() {
    console.log("submit login to facebook");
    // FB.login();
    FB.login((response) => {
      console.log('submitLogin', response);
      if (response.authResponse) {
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

  logout() {
    FB.logout(function(response) {
      console.log('logout', response)
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