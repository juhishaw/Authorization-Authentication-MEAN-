import versions from '../_versions';

const frontendBasedUrl = 'http://localhost:4200';
const backendBasedUrl = 'http://localhost:3000/api';

export const environment = {
  production: false,
  frontendBasedUrl: frontendBasedUrl,
  backendBasedUrl: backendBasedUrl,
  port: '',
  appVersion: versions.version,
};

