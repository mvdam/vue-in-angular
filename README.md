## Start apps

Angular:

`cd ./angular-app && npm start` -> http://localhost:4200

Vue:

`cd ./vue-app && npm start` -> http://localhost:4201

## Used methods

### Method 1 - Convert Vue App to Webcomponent

Pros

- Easy to implement
- Databinding works

Cons

- Bundle size increases: Angular + Vue source code
- Source code tightly coupled

### Method 2 - Build Vue App seperately and serve from directory

Set correct base url for Vite. This should match the correct folder in which the build artifact is placed in NGINX.

```sh
base: '/vue-standalone',
```

```sh
podman machine start
podman build -t angular-vue .
podman run -p 3000:8080 angular-vue
```

Pros

- Remains separate app
- Bundle size of Angular app not affected

Cons

- No direct control and databinding from Angular
- More complex setup with nginx
- Not sure how to sync the OAuth access token between Angular and Vue

## How to make Method 1 scale:

Build the Vue app separately. Create a "standalone" entry point:

```ts
// main.ce.ts
import { defineCustomElement } from "vue";
import App from "./App.ce.vue";

const VueElement = defineCustomElement(App);

customElements.define("vue-standalone", VueElement);
```

Vite config setup to make the build artifact one file (easy to import later on):

```ts
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue({
      customElement: true,
    }),
  ],
  build: {
    lib: {
      entry: "src/main.ce.ts",
      name: "VueStandalone",
      fileName: () => "vue-standalone.js",
      formats: ["es"],
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
```

The build output should be copied to the assets folder of Angular to be added to the wrapper component file:

```ts
import "./assets/vue/vue-standalone.js";
```

De VueWrapper component moet custom element scheme krijgen:

```ts
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VueWrapperComponent {}
```

Gebruik het Web Component binnen Angular:

```ts
@Component({
  selector: "app-vue-wrapper",
  template: `<vue-standalone></vue-standalone>`,
})
export class VueWrapperComponent {}
```
