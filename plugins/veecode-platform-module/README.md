# VeeCode Platform Module Plugin

The **Veecode Platform Module** plugin is a backend plugin module that extends the backstage catalog, adding new features to the application's standard behavior.

Such as new **kinds**, new **schemas** and a new **apiversion**.

**Kinds:**

- Environment
- Cluster
- Database
- Vault


**ApiVersion**

- veecode.backstage.io/v1alpha1

  

## Get started

```yaml
cd packages/backend
yarn add @veecode-platform/plugin-veecode-platform-common
```

#### ⭐ Legacy Backend

Now, in the file `packages > backend > src > plugins > catalog.ts`:

```diff
...
+ import { ClusterEntitiesProcessor, DatabaseEntitiesProcessor, EnvironmentEntitiesProcessor, VaultEntitiesProcessor } from '@veecode-platform/plugin-veecode-platform-common';
...

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const builder = await CatalogBuilder.create(env);
  ... 
  
+  builder.addProcessor( new ClusterEntitiesProcessor());
+  builder.addProcessor( new EnvironmentEntitiesProcessor());
+  builder.addProcessor( new DatabaseEntitiesProcessor());
+  builder.addProcessor( new VaultEntitiesProcessor());

  builder.addProcessor(new ScaffolderEntitiesProcessor());
  const { processingEngine, router } = await builder.build();
  await processingEngine.start();
  return router;
}

...
```

#### 🆕 New Backend

In `packages > backend > src > index.ts`:

```diff

import { createBackend } from '@backstage/backend-defaults';
+ import { catalogModuleVeeCodeProcessor } from '@veecode-platform/plugin-veecode-platform-module/alpha';

const backend = createBackend();

backend.add(import('@backstage/plugin-app-backend/alpha'));
backend.add(import('@backstage/plugin-proxy-backend/alpha'));
backend.add(import('@backstage/plugin-scaffolder-backend/alpha'));
backend.add(import('@backstage/plugin-techdocs-backend/alpha'));
...

+ backend.add(catalogModuleVeeCodeProcessor);


backend.start();
```

<br>


By adding the processors to the application's backend, we extend our configuration to the default behavior of the backstage.


**Remember that in order to access the customized types, you just need to grant access in `app-config.yaml`:**

```diff
catalog:
  import:
    entityFilename: catalog-info.yaml
    pullRequestBranchName: backstage-integration
  rules:
+    - allow: [Component, System, API, Resource, Location, Database, Cluster, Environment, Vault]
...
```