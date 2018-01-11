import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  constructor(private heroservice: HeroService) {}

  ngOnInit() {
    this.getheroes();
  }


  getheroes(): void {
    this.heroservice.getheroes().subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim()
    if (!name) { return; }
    this.heroservice.addhero({name} as Hero).subscribe(() => this.getheroes());
  }

  delete(hero: Hero): void {
    this.heroservice.deletehero(hero).subscribe(() => this.getheroes());
  }

}
