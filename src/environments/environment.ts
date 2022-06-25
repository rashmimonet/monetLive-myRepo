// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


// const serverName: 'concall'
const serverName = 'devcall';

export const environment = {
  production: false,
  serverName,

  // base: `https://${serverName}.monetrewards.com/many/api/`,
  // base: `https://wrtc.monetanalytics.com/many/api/`,
  base: `https://www.monetlive.com/many/api/`,


  webBase: 'https://ngnx.monetrewards.com/webs/api/',
  build: 'monet-live-calendar'
};


