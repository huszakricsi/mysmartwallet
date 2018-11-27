import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/state/auth.service';
import { LocalStorageService } from 'angular-web-storage';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  
  @ViewChild('drawer') drawer;

  location:string = 'home';

  constructor(private router:Router, private authService:AuthService, public local: LocalStorageService, private translate: TranslateService) { }

  ngOnInit() {
  }
  public navigate(location:string)
  {
    this.location=location;
    this.router.navigateByUrl(location);
    this.drawer.toggle();
  }
  public setLanguage(language:string)
  {
    this.local.set('language',language);
    this.translate.use(language);
    this.translate.get('LANGUAGE_SET', {value: language}).subscribe((res:string)=>{
      console.log(res)
    });
    this.drawer.toggle();
  }
  public logOut(){
    this.authService.logout();
  }
}
