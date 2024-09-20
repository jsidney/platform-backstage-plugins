import {
  CatalogProcessor,
  CatalogProcessorCache,
  CatalogProcessorEmit,
  CatalogProcessorParser,
  processingResult,
} from "@backstage/plugin-catalog-node";
import { LocationSpec } from "@backstage/plugin-catalog-common";
import { Config } from "@backstage/config";
import { readProviderConfigs, InfracostProviderConfig } from "../lib/config";
import { CacheService, LoggerService, AuthService } from "@backstage/backend-plugin-api";
import {
  Entity,
  getCompoundEntityRef,
  parseEntityRef,
  RELATION_OWNED_BY,
  RELATION_OWNER_OF,
} from "@backstage/catalog-model";
import type { InfracostEntityV1alpha1 as InfracostEntity } from "../model";
import { InfracostEntityV1alpha1Validator } from "../model";
import { InfracostService } from "../service/InfracostService";
import { InfracostEstimate } from '@veecode-platform/backstage-plugin-infracost-common';

export class InfracostEntityProcessor implements CatalogProcessor {

  private config: Config;
  private providerConfig: InfracostProviderConfig;
  private logger: LoggerService;
  private cache: CacheService;
  private auth: AuthService;
    private readonly validators = [InfracostEntityV1alpha1Validator];
  private readonly infracostService: InfracostService;

  getProcessorName(): string {
    return "InfracostEntitiesProcessor";
  }

  constructor(
    config: Config,
    logger: LoggerService,
    cache: CacheService,
    auth: AuthService
  ) {
    this.config = config;
    this.logger = logger;
    this.cache = cache;
    this.auth = auth;
    this.providerConfig = readProviderConfigs(this.config)[0];
    this.infracostService = new InfracostService()
  }

  async validateEntityKind(entity: Entity): Promise<boolean> {
    for (const validator of this.validators) {
      if (await validator.check(entity)) {
        return true;
      }
    }
    return false;
  }

  readLocation(
    location: LocationSpec,
    _optional: boolean,
    _emit: CatalogProcessorEmit,
    _parser: CatalogProcessorParser,
    _: CatalogProcessorCache
  ): Promise<boolean> {
    if (location.type !== 'url' && this.cache && this.providerConfig && this.logger) {
      return Promise.resolve(false);
    }

    return Promise.resolve(false);
  }

  private isInfracostType(entity: Entity): boolean {
    return (!!entity && entity.kind === "Infracost")
  }

  private extractEstimate(entity: InfracostEntity): InfracostEstimate {
    const estimateKey = entity.spec.estimate;
    const name = entity.metadata.name;
    const estimateTransform = estimateKey.replace("\n' + '", '');
    const estimate = JSON.parse(estimateTransform);
    const estimateResult = {
      name: name,
      currency: estimate.currency,
      projects: estimate.projects,
      total_hourly_cost: estimate.totalHourlyCost,
      total_monthly_cost: estimate.totalMonthlyCost,
      total_monthly_usage_cost: estimate.totalMonthlyUsageCost,
      past_total_hourly_cost: estimate.pastTotalHourlyCost,
      past_total_monthly_cost: estimate.pastTotalMonthlyCost,
      past_total_monthly_usage_cost: estimate.pastTotalMonthlyUsageCost,
      diff_total_hourly_cost: estimate.diffTotalHourlyCost,
      diff_total_monthly_cost: estimate.diffTotalMonthlyCost,
      diff_total_monthly_usage_cost: estimate.diffTotalMonthlyUsageCost,
      summary: estimate.summary,
      time_generated: estimate.timeGenerated
    }
    return estimateResult as InfracostEstimate
  }

  async postProcessEntity(
    entity: Entity,
    _location: LocationSpec,
    emit: CatalogProcessorEmit,
    _cache: CatalogProcessorCache
  ): Promise<Entity> {

    const selfRef = getCompoundEntityRef(entity);
    if (this.isInfracostType(entity)) {

      const infracost = entity as InfracostEntity;
      const owner = infracost.spec.owner;

      if (owner !== undefined && owner.length) {
        const targetRef = parseEntityRef(owner, {
          defaultKind: 'Group',
          defaultNamespace: selfRef.namespace,
        });
        emit(
          processingResult.relation({
            source: selfRef,
            type: RELATION_OWNED_BY,
            target: {
              kind: targetRef.kind,
              namespace: targetRef.namespace,
              name: targetRef.name,
            },
          }),
        );
        emit(
          processingResult.relation({
            source: {
              kind: targetRef.kind,
              namespace: targetRef.namespace,
              name: targetRef.name,
            },
            type: RELATION_OWNER_OF,
            target: selfRef,
          }),
        );
      }

      const endpoint = this.providerConfig.baseUrl;
      const infracostProjectsEstimate = this.extractEstimate(infracost);

      try {
          const { token } = await this.auth.getPluginRequestToken({
            onBehalfOf: await this.auth.getOwnServiceCredentials(),
            targetPluginId: 'infracost', 
          });
        this.infracostService.saveInfracostProjectsEstimate(`${endpoint}/api/infracost`, infracostProjectsEstimate, token)
        this.logger.info('InfracostEntitiesProcessor: Saved entity metadata infracost on database')
      }
      catch (error) {
        this.logger.error(`InfracostEntitiesProcessor: There was an error trying to persist the entity metadata Infracost on database [${error}]`)
      }
    }
    return entity;
  }



}