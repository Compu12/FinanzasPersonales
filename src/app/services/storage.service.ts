import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class StorageLocalService {

  constructor(@Inject(LOCAL_STORAGE) private storage:StorageService) {}

  traerValor(key:string){
      return this.storage.get(key);
  }
  guardarValor(key:string, val:any){
    this.storage.set(key,val);
  }
  eliminarSt(key:string){

    this.storage.remove(key)
  }
  
}
