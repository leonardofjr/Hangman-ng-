import { Component, OnInit } from '@angular/core';
import { NgZone } from '@angular/core'

import { Router } from "@angular/router";

declare var FB: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Hangman';
  loginStatus:boolean = false;

  constructor(private _ngZone: NgZone, private router: Router){}

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

  logout() {
    let _self = this;
    FB.getLoginStatus(function(response) {
      if(response && response.status === 'connected') {
        FB.logout(function (response) {
          if (response) {
            _self.hideLogoutBtn();

            _self.loginStatus = false;

            _self._ngZone.run(() => {
              _self.router.navigateByUrl('/');
            })

            localStorage.removeItem('token');
            console.log('logout', response)
          }

        })
      }
    })

  }

  hideLogoutBtn() {
    document.getElementById('logoutBtn').classList.add('d-none');

  }

}