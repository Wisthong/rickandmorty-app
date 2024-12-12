import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Result, RickyMorty } from '../interface/rick.interface';
import { Character } from '../interface/character';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RickService {
  private readonly http = inject(HttpClient);
  private readonly apiRicky = environment.apiUrl;

  getRickyPage(page: number): Observable<Result[]> {
    return this.http
      .get<RickyMorty>(this.apiRicky + 'character/?page=' + page)
      .pipe(
        map(({ results }) => {
          return results;
        })
      );
  }

  getCharacter(character: number): Observable<Character> {
    return this.http.get<Character>(this.apiRicky + 'character/' + character);
  }
}
