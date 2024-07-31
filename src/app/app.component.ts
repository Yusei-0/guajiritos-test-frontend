import { Component, inject, OnDestroy, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { LoaderService } from './services';
import { Subscription } from 'rxjs';
import { LoaderComponent } from './components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
  title = 'guajiritos-test';

  isLoading = signal<boolean>(false);

  loaderService = inject(LoaderService);
  private loaderSubscription: Subscription;

  constructor() {
    this.loaderSubscription = this.loaderService.isLoading$.subscribe(
      (isLoading) => {
        this.isLoading.set(isLoading);
      }
    );
  }
  ngOnDestroy(): void {
    this.loaderSubscription.unsubscribe();
  }
}
