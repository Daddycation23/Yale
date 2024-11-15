/**
 * Main application configuration file
 * Configures routing and client-side hydration
 */
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';

// Import routes configuration
import { routes } from './app.routes';

// Application configuration
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),     // Configure routing
    provideClientHydration()   // Enable client-side hydration
  ]
};
