import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
@Input() hero: Hero;
  constructor(private route: ActivatedRoute,
  private heroservice: HeroService,
  private location: Location) { }

  ngOnInit() {
  this.gethero();
  }

  gethero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroservice.gethero(id).subscribe(hero => this.hero = hero);
  }

  goBack() {
    this.location.back();
  }

  save() {
    this.heroservice.updatehero(this.hero).subscribe(() => this.goBack());
  }

}
