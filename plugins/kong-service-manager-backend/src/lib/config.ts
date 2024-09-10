import { Config } from '@backstage/config';
import { LoggerService } from "@backstage/backend-plugin-api";
import { IKongConfig, IKongConfigOptions } from './types';

export class KongConfig implements IKongConfig {
  
  constructor(
    private config: Config,
    private logger: LoggerService
  ){}
  
  getConfig() : IKongConfigOptions[] {
    const kongConfig = this.config.getConfig('kong');
    if(!kongConfig){
      this.logger.error(`No configuration found for kong`)
    }
    return kongConfig.get('instances') as IKongConfigOptions[];
  };

  getInstance(instanceId: string): IKongConfigOptions {
    const instances = this.getConfig();
    const instance = instances.filter(i => i.id === instanceId);
    return instance[0] ?? {};
  }

}