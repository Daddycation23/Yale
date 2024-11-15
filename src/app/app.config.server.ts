/**
 * Server-side application configuration
 * Merges server-specific configuration with base configuration
 */
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

// Server-specific configuration
const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering()  // Enable server-side rendering
  ]
};

// Merge base config with server config
export const config = mergeApplicationConfig(appConfig, serverConfig);
