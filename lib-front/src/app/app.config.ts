import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';


import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem("access");
  }
  return null;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    
    provideHttpClient(withInterceptorsFromDi()), 

    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ["localhost:8000"],
          disallowedRoutes: ["http://localhost:8000/pacientes/login_paciente/"],
        },
      })
    ),
  ],
};