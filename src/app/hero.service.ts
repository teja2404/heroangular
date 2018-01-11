import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Hero} from './hero';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()


export class HeroService {
  private Url = 'http://localhost:3000/heros';
  constructor(private http: HttpClient) { }


  getheroes (): Observable<Hero[]> {
    return this.http.get(this.Url).map(this.extractData).catch(this.handleError);
  }

  addhero(hero: Hero): Observable<Hero[]> {
    return this.http.post(this.Url, hero, httpOptions).map(this.extractData).catch(this.handleError);
  }

  deletehero(hero: Hero | number): Observable<Hero[]>{
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.Url}/${id}`;
    return this.http.delete(url, httpOptions).map(this.extractData).catch(this.handleError);
  }

  gethero(id: number): Observable<Hero> {
    const url = `${this.Url}/${id}`;
    return this.http.get(url).map(this.extractData).catch(this.handleError);
  }

  updatehero(hero: Hero): Observable<Hero[]> {
    const url = `${this.Url}/${hero.id}`;
    return this.http.put(url, hero, httpOptions).map(this.extractData).catch(this.handleError);
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.post(`http://localhost:3000/heros/search?name=${term}`, httpOptions).map(this.extractData).catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res;
    console.log(body)
    return body || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
