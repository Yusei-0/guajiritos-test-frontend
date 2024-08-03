import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { UserService } from '@/services';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[tmJustForAdmin]',
  standalone: true,
})
export class JustForAdminDirective implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.subscription = this.userService.user$.subscribe((user) => {
      if (user.role === 'admin') {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
