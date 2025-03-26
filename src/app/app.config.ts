import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { PWAModule } from '../@core/pwa';
import { StateModule } from './app.state.module';
import { authInterceptor } from '../@core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,
      withInMemoryScrolling({
        scrollPositionRestoration: "top",
      })
    ),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(
      PWAModule.forRoot(),
      StateModule.forRoot(),
    )
  ]
};
