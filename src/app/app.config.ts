import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(), //without app.module, this is how we define HTTP
    NgxChartsModule, //ngxChart
    BrowserAnimationsModule, //solve issue with synthetic property @panelState
    provideAnimations(), //solve issue with synthetic property @panelState
    NoopAnimationsModule //solve issue with synthetic property @panelState
  ]
};
