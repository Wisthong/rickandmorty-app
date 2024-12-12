import { Component, inject, Input, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonImg,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { RickService } from '../service/rick.service';
import { Character } from '../interface/character';
import { DatePipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    IonCardContent,
    IonCardSubtitle,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    DatePipe,
  ],
})
export class Tab2Page implements OnInit {
  @Input() id!: number;
  character!: Character;

  private readonly rickyService = inject(RickService);

  ngOnInit(): void {
    this.rickyService.getCharacter(this.id!).subscribe((resOk) => {
      this.character = resOk;
    });
  }
}
