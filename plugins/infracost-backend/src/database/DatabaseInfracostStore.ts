import { Knex } from "knex";
import { LoggerService, resolvePackagePath } from "@backstage/backend-plugin-api";
import { InfracostEstimate, InfracosteStore } from "./InfracostStore";
import { PluginDatabaseManager } from "@backstage/backend-common";
import { INFRACOST_TABLE } from "../utils/constants";

const migrationsDir = resolvePackagePath(
  '@veecode-platform/backstage-plugin-infracost-backend',
  'migrations'
)

export class DatabaseInfracostStore  implements InfracosteStore {

  private constructor(
    private readonly db: Knex,
    private readonly logger: LoggerService
  ) {}

  static async create(options:{
    database: PluginDatabaseManager,
    skipMigrations?: boolean,
    logger: LoggerService
  }): Promise<DatabaseInfracostStore> {
    const {database,skipMigrations, logger} = options;
    const client = await database.getClient();
    if (!database.migrations?.skip && !skipMigrations) {
      await client.migrate.latest({
        directory: migrationsDir
      })
    }
    return new DatabaseInfracostStore(client,logger)
  }

  async createInfracostProjectsEstimate(estimate:InfracostEstimate){
    try{
      return await this.db.transaction( async trx => {
        await trx(INFRACOST_TABLE)
        .insert({
          name: estimate.name,
          currency: estimate.currency,
          projects: estimate.projects,
          total_hourly_cost: estimate.total_hourly_cost,
          total_monthly_cost: estimate.total_monthly_cost,
          total_monthly_usage_cost: estimate.total_monthly_usage_cost,
          past_total_hourly_cost: estimate.past_total_hourly_cost,
          past_total_monthly_cost: estimate.past_total_hourly_cost,
          past_tota_monthly_usage_cost: estimate.past_total_monthly_usage_cost,
          diff_total_hourly_cost: estimate.diff_total_hourly_cost,
          diff_total_monthly_cost: estimate.diff_total_monthly_cost,
          diff_total_monthly_usage_cost: estimate.diff_total_monthly_usage_cost,
          sumary: estimate.sumary,
          time_generated: estimate.time_generated
        })
        .onConflict(['name'])
        .ignore();

        const [infracostEstimate] = await trx(INFRACOST_TABLE).where({
          name: estimate.name,
        });

        return infracostEstimate || null;
      })
    }
    catch(error:any){
      this.logger.error(error.message);
      return null
    }
  }

  async listInfracostProjectsEstimate():Promise<InfracostEstimate[]|null>{
    try{
      return await this.db.select('*').from(INFRACOST_TABLE)
    }
    catch(error:any){
      this.logger.error(error.message);
      return null
    }
  }

  async getInfracostProjectsEstimatebyName(name: string):Promise<InfracostEstimate|null>{
    try{
      const estimate = await this.db(INFRACOST_TABLE).where('name', '=', name);
      return estimate && estimate.length > 0 ? estimate[0]:null
    }
    catch(error:any){
      this.logger.error(error.message);
      return null
    }
  };

  async updateInfracostProjectsEstimate(estimate:InfracostEstimate):Promise<InfracostEstimate|null>{
    try{
      return await this.db.transaction( async trx => {
        const updateEstimateRowsCount = await trx(INFRACOST_TABLE)
        .where('name', '=', estimate.name)
        .update({
                  name: estimate.name,
                  currency: estimate.currency,
                  projects: estimate.projects,
                  total_hourly_cost: estimate.total_hourly_cost,
                  total_monthly_cost: estimate.total_monthly_cost,
                  total_monthly_usage_cost: estimate.total_monthly_usage_cost,
                  past_total_hourly_cost: estimate.past_total_hourly_cost,
                  past_total_monthly_cost: estimate.past_total_hourly_cost,
                  past_tota_monthly_usage_cost: estimate.past_total_monthly_usage_cost,
                  diff_total_hourly_cost: estimate.diff_total_hourly_cost,
                  diff_total_monthly_cost: estimate.diff_total_monthly_cost,
                  diff_total_monthly_usage_cost: estimate.diff_total_monthly_usage_cost,
                  sumary: estimate.sumary,
                  time_generated: estimate.time_generated
          });

          if(updateEstimateRowsCount === 1) return estimate;
          return null
      })
    }
    catch(error:any){
      this.logger.error(error.message);
      return null;
    }
  }

  async deleteInfracostProjectsEstimate(name:string):Promise<boolean>{
    try{
      const operation = await this.db(INFRACOST_TABLE)
      .where('name','=',name)
      .delete();
      return !!operation;
    }catch(error:any){
      this.logger.error(error.message);
      return false
    }
  }
}