// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// export const domainName = 'http://143.198.120.163:8000';
export const domainName = 'http://localhost:8000';

export const environment = {
  GOOGLE_CLIENT_ID: '881739191835-niui5u8s5jb2r2b73ip38oon4bo53j93.apps.googleusercontent.com',
  AUTO_RIA_CLIENT_ID: 'EB214j1t3iEGjhZBaECZOd7bbt3oCpop6iqbFW6k',

  production: false,
  //auth

  login: 'api/login',
  logout: 'api/logout',
  register: 'api/register',
  googleSsoLogin: 'api/login-google-sso',

  // RIA
  autoRIAEntity: 'https://developers.ria.com/auto'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
