import { createApiFactory, createPlugin, discoveryApiRef, createComponentExtension, identityApiRef, createRoutableExtension } from '@backstage/core-plugin-api';
import { rootRouteRef } from './routes';
import { kongServiceManagerApiRef, KongServiceManagerApiClient } from './api';

export const kongServiceManagerPlugin = createPlugin({
  id: 'kong-service-manager',
  routes: {
    root: rootRouteRef,
  },
  apis: [
    createApiFactory({
      api: kongServiceManagerApiRef,
      deps: { discoveryApi: discoveryApiRef, identityApi: identityApiRef },
      factory: ({discoveryApi, identityApi}) => {
        return new KongServiceManagerApiClient({
          discoveryApi: discoveryApi,
          identityAPi: identityApi
        })
      }
    })
  ]
});

export const KongServiceManagerPage = kongServiceManagerPlugin.provide(
  createRoutableExtension({
    name: 'KongServiceManagerPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
