import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';

@Component({
  selector: 'app-vue',
  templateUrl: './vue.component.html',
  styleUrl: './vue.component.scss',
  imports: [CommonModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA, // Added for custom elements support
  ],
})
export class VueComponent {
  public objectIds = signal<string[]>([]);
  public blob = signal<Blob | null>(null);

  public addObjectId() {
    const uuid = crypto.randomUUID();
    this.objectIds.update((current) => [...current, uuid]);
  }

  public onPublishFile(event: any) {
    const receivedBlob = event.detail;
    this.blob.set(receivedBlob);
  }
}
