import { coreServices, createBackendModule } from '@backstage/backend-plugin-api';
import { catalogProcessingExtensionPoint } from '@backstage/plugin-catalog-node/alpha';
import { InfracostEntityProvider } from '../providers';
import { InfracostEntityProcessor } from '../processors';

export const catalogModuleInfracostProcessor = createBackendModule({
  pluginId: 'catalog',
  moduleId: 'infracost-processor',
  register(env) {
    env.registerInit({
      deps: {
        catalog: catalogProcessingExtensionPoint,
        config: coreServices.rootConfig,
        logger: coreServices.logger,
        cache: coreServices.cache,
        database: coreServices.database,
        scheduler: coreServices.scheduler,
        auth: coreServices.auth
      },
      async init({ catalog, config, logger, cache, database, scheduler, auth }) {
        // add Entity Provider
        catalog.addEntityProvider(
          InfracostEntityProvider.fromConfig(config, {
            id: 'default',
            logger,
            cache,
            database,
            scheduler,
            auth

          })
        );
        // add Processor
        const infracostProcessor = new InfracostEntityProcessor(config, logger, cache, auth)
        catalog.addProcessor(infracostProcessor)
      },
    });
  },
});