import { Component, inject } from '@angular/core';
import { routes } from '../../app.routes';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  imports: [RouterLink, RouterLinkActive],
})
export class NavComponent {
  private readonly route = inject(ActivatedRoute);

  public readonly routes = routes;

  public isActive(path?: string): boolean {
    console.log({
      path,
      snapshotUrl: this.route.snapshot,
    });
    return false;
    // return this.route.snapshot.p.includes(path)
  }
}
