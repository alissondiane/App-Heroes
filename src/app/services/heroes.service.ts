import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private url='https://loginapp-81fa8.firebaseio.com'
  constructor(private http:HttpClient) { }
  
  crearHeroe(heroe: HeroeModel){
    return this.http.post(`${this.url}/Heroes.json`,heroe)
    .pipe(
      map((resp:any)=>{
        heroe.id = resp.name;
        return heroe;

      })
    );
  }
  actualizarHeroe(heroe:HeroeModel){
    const heroeTemp={
      ...heroe
    };
    
    delete heroeTemp.id;
    console.log("Heroe temporal:");
    console.log(heroeTemp);
    return this.http.put(`${this.url}/Heroes/${heroe.id}.json`,heroeTemp);
  }
  borrarHeroe(id:string){
    return this.http.delete(`${this.url}/Heroes/${id}.json`);
  }
  getHeroe(id:string){
    return this.http.get(`${this.url}/Heroes/${id}.json`);
  }
  getHeroes(){
    return this.http.get(`${this.url}/Heroes.json`)
    .pipe(map(
      resp=>this.crearArreglo(resp)
    ));
  }
  private crearArreglo(heroesObj: object){
    const heroes: HeroeModel[] = [];
    Object.keys(heroesObj).forEach(key=>{
      const heroe:HeroeModel = heroesObj[key];
      heroe.id=key;
      heroes.push(heroe);
    });
    return heroes;
    
  }
}
