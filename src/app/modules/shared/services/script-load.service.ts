import { Injectable } from '@angular/core';


interface Scripts {
  name: string;
  src: string;
}
export const ScriptList: Scripts[] = [
  // {name: 'agent', src: 'https://webrtc.monetrewards.com/web2s/proctor1.js'},
  // {name: 'user', src: `https://${environment.serverName}.monetrewards.com/many/MonetConference.js`},
  //  {name: 'user', src: '../../../../assets/js/MonetConference.js'},
  {name: 'user', src: 'https://www.monetlive.com/many/MonetConference.js'},
  // {name: 'janus', src: `https://${environment.serverName}.monetrewards.com/many/janus.js`},
  // {name: 'janus', src: `http://localhost:8092/many/janus.js`},
  {name: 'janus', src: `https://www.monetlive.com/many/janus.js`},


  // {name: 'client', src: 'https://webrtc.monetrewards.com/web2s/student2.js'},
  // {name: 'manager', src: 'https://webrtc.monetrewards.com/web2s/manager3.js'},
  // {name: 'camvas', src: 'assets/js/camvas.js'},
  // {name: 'pico', src: 'assets/js/pico.js'},
  // {name: 'fd', src: 'assets/js/fd.js'},
  // {name: 'checkout', src: 'assets/js/checkout.js'},
  // {name: 'lploc', src: 'assets/js/lploc.js'},
  // {name: 'socket', src: 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/3.0.4/socket.io.js" integrity="sha512-aMGMvNYu8Ue4G+fHa359jcPb1u+ytAF+P2SCb+PxrjCdO3n3ZTxJ30zuH39rimUggmTwmh2u7wvQsDTHESnmfQ=='},
];

@Injectable({providedIn: 'root'})
export class ScriptLoadService {
  private scripts: any = {};

  constructor() {
    ScriptList.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }
  load(...scripts: string[]): any {
    const promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string): any {
     // console.warn('script name :', name);
    if (name !== '') {
      return new Promise((resolve, reject) => {
        // resolve if already loaded
        if (document.getElementsByClassName(name).length > 0) {
          resolve({script: name, loaded: true, status: 'Already Loaded'});
        } else {
          // load script
          const script = document.createElement('script') as any;
          script.type = 'text/javascript';
          script.src = this.scripts[name].src;
          script.className = name;
          if (script.readyState) {  // IE
            script.onreadystatechange = () => {
              if (script.readyState === 'loaded' || script.readyState === 'complete') {
                script.onreadystatechange = null;
                this.scripts[name].loaded = true;
                resolve({script: name, loaded: true, status: 'Loaded'});
              }
            };
          } else {  // Others
            script.onload = () => {
              this.scripts[name].loaded = true;
              resolve({script: name, loaded: true, status: 'Loaded'});
            };
          }
          script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
          document.getElementsByTagName('head')[0].appendChild(script);
        }
      });
    } else {
      return 0;
    }
  }
}
