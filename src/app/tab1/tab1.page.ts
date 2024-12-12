import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonImg,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  InfiniteScrollCustomEvent,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { RickService } from '../service/rick.service';
import { Result } from '../interface/rick.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonImg,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  ],
})
export class Tab1Page implements OnInit {
  listRickyMorty: Result[] = [];
  currentPage: number = 1; // Página inicial
  isLoading: boolean = false; // Para evitar solicitudes duplicadas mientras se cargan los resultados
  private readonly rickYService = inject(RickService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    // Cargar la primera página
    this.loadPage(this.currentPage);
  }

  loadPage(page: number): void {
    if (this.isLoading) return; // No hacer solicitudes si ya estamos cargando

    this.isLoading = true;
    this.rickYService.getRickyPage(page).subscribe((resOk) => {
      this.listRickyMorty = [...this.listRickyMorty, ...resOk]; // Concatenar nuevos resultados
      this.isLoading = false; // Finalizar carga
    });
  }

  loadMore(event: InfiniteScrollCustomEvent): void {
    if (this.isLoading) {
      event.target.complete(); // Completar la carga si ya estamos cargando
      return;
    }

    this.currentPage++; // Incrementar la página
    this.loadPage(this.currentPage); // Cargar la siguiente página

    // Llamar a complete() para detener el spinner cuando se haya terminado de cargar
    event.target.complete();
  }

  onClick(item: Result) {

    this.router.navigate(['/character/' + item.id]);
  }
}
