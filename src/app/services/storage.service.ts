import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async store(storageKey: string, value: string){
    //const encryptedValue = btoa(escape(JSON.stringify(value)));
    const encryptedValue = btoa(JSON.stringify(value));
    localStorage.setItem(storageKey,encryptedValue);
  }

/*   async get(storageKey: string){
    //const ret = await localStorage.get({ key:storageKey });
    const ret = localStorage.getItem( storageKey );
    JSON.parse(atob(localStorage.getItem(storageKey)));
    if(ret){
      //return JSON.parse(unescape(atob(ret.value)));
      return JSON.parse(localStorage.getItem( ret.value ));
    }else{
      return false;
    }
  } */

  async get(storageKey: string) {
    //const ret = await Storage.get({ key: storageKey });
    const ret = localStorage.getItem( storageKey );
    if (ret) {
      return JSON.parse(atob(ret));
    } else {
      return false;
    }
  }

  

  async removeItem(storageKey: string){
    //await localStorage.remove({key: storageKey});
    localStorage.removeItem(storageKey);
  }

  async clear(){
    //await localStorage.clear();
    localStorage.clear();
  }

  
}
