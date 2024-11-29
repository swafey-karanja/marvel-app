import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  private marvelBaseUrl = "https://gateway.marvel.com/v1/public/";
  private apiPublicKey = "32ecfb18a3f0d58b423aa794f2996061";
  private apiPrivateKey = "b00cc53d578df0d302ab6e0d0dad8b21d29fdd4a";

  private generateHash(ts: string): string {
    return CryptoJS.MD5(ts + this.apiPrivateKey + this.apiPublicKey).toString();
  }


  getCharacters (limit: number) : Observable<any> {
    const ts = new Date().getTime().toString();
    const hash = this.generateHash(ts);

    return this.http.get<any[]>(`${this.marvelBaseUrl}characters?limit=${limit}&ts=${ts}&apikey=${this.apiPublicKey}&hash=${hash}`);
  }


  getComics (limit: number): Observable<any> {
    const ts = new Date().getTime().toString();
    const hash = this.generateHash(ts);

    return this.http.get<any[]>(`${this.marvelBaseUrl}comics?limit=${limit}&ts=${ts}&apikey=${this.apiPublicKey}&hash=${hash}`);
  }

  getSpecificCharacter(name: string) : Observable<any> {
    const ts = new Date().getTime().toString();
    const hash = this.generateHash(ts);

    return this.http.get<any[]>(`${this.marvelBaseUrl}characters?name=${name}&ts=${ts}&apikey=${this.apiPublicKey}&hash=${hash}`);
  }

  constructor(private http: HttpClient) { }
}

