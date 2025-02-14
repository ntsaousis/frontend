import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app/app.routes'; // Import your routes
import { provideRouter } from '@angular/router'; // Import provideRouter
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  ...appConfig, 
  providers: [
    provideHttpClient(withInterceptorsFromDi()), 
    provideRouter(routes), // The crucial part - provide the routes
    ...appConfig.providers // Spread any providers from your existing appConfig
  ]
}).catch(err => console.error(err));