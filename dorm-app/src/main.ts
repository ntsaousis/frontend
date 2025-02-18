import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app/app.routes'; 
import { provideRouter } from '@angular/router'; 
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  ...appConfig, 
  providers: [
    provideHttpClient(withInterceptorsFromDi()), 
    provideRouter(routes),
    ...appConfig.providers 
  ]
}).catch(err => console.error(err));