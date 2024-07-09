import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { NgHttpLoaderModule } from 'ng-http-loader';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideClientHydration(),
    HttpClient,
  provideHttpClient(
    withInterceptorsFromDi()
  ),
  importProvidersFrom(NgHttpLoaderModule.forRoot()),
    CommonModule, DatePipe]
};
