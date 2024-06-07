/* eslint-disable @backstage/no-undeclared-imports */
import { PluginDatabaseManager, UrlReader, errorHandler } from '@backstage/backend-common';
import { AuthService, DiscoveryService, HttpAuthService, LoggerService, PermissionsService } from '@backstage/backend-plugin-api';
import { Config } from '@backstage/config';
import express, { RequestHandler } from 'express';
import Router from 'express-promise-router';
import { CatalogApi } from '@backstage/catalog-client';
import { IdentityApi } from '@backstage/plugin-auth-node';
import { InfracosteStore } from '../database';
import { InputError } from '@backstage/errors';

export interface RouterOptions {
  logger: LoggerService;
  config: Config;
  reader?: UrlReader;
  database: InfracosteStore;
  catalogClient?: CatalogApi;
  permissions?: PermissionsService;
  auth?: AuthService;
  httpAuth?: HttpAuthService;
  identity?: IdentityApi;
  discovery?: DiscoveryService;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {

  const {logger,database} = options;
  const router = Router();

  router.use(express.json());
  router.use(
    express.urlencoded({
      extended: true,
    }),
  );

   /**
   * health check
   */

  router.get('/health', (_, response) => {
    logger.info('PONG!');
    response.json({ status: 'ok' });
  });
  
   /**
   * List ALL Infracost Projects Estimate on the database
   */

  router.get('/infracost-estimate',( async (_, response) => {
    const data = await database.listInfracostProjectsEstimate();
    if(!data){
      throw new InputError('There was an error trying to get Infracost Projects Estimate')
    }
    response.status(200);
    response.json(data)
  }) as RequestHandler);

   /**
   * Get by name
   */
   router.get('/infracost-estimate/id/:name',( async (request, response) => {
    const estimateName = request.params.name;
    const data = await database.getInfracostProjectsEstimatebyName(estimateName);

    response.status(200);
    response.json(data ?? [])
  }) as RequestHandler);

   /**
   * Insert / Create a new Infracost Projects Estimate
   */

   router.post('/infracost-estimate',(async(request, response)=>{
      const newEstimate = request.body;
      const data = await database.createInfracostProjectsEstimate(newEstimate);

      if(!data){
        throw new InputError("There was an error trying persist Infracost Projects Estimate on database")
      }

      response.status(201);
      response.json(data)

   }) as RequestHandler);

   /**
   * Delete a Infracost Projects Estimate
   */

   router.delete('/infracost-estimate/:name', ( async (request,response)=> {
    const estimateName = request.params.name;
    const data = await database.deleteInfracostProjectsEstimate(estimateName) ;

    if(!data){
      throw new InputError("There was an error trying to delete the estimate...")
    }

    response.status(204)
    response.json({status: 204, message: `Infracost Projects Estimate for ${estimateName} was successfully deleted`})
   }) as RequestHandler);

   /**
   * Update a Infracost Projects Estimate
   */

   router.put('/infracost-estimate', ( async (request,response)=> {
    const updatedEstimate = request.body;
    const data = await database.updateInfracostProjectsEstimate(updatedEstimate);

    if(!data){
      throw new InputError("There was an error trying to update the estimate...")
    }

    response.status(200)
    response.json(data)
   }) as RequestHandler);

  router.use(errorHandler());

  return router;
}


/* Idendity user
export interface RouterOptions {
  logger: LoggerService;
  userInfo: UserInfoService;
  httpAuth: HttpAuthService;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { userInfo, httpAuth } = options;

  router.post('/me', async (req, res) => {
    const credentials = await httpAuth.credentials(req, {
      // This rejects request from non-users. Only use this if your plugin needs to access the
      // user identity, most of the time it's enough to just call `httpAuth.credentials(req)`
      allow: ['user'],
    });

    const userInfo = await userInfo.getUserInfo(credentials);

    res.json({
      // The catalog entity ref of the user.
      userEntityRef: userInfo.userEntityRef,

      // The list of entities that this user or any teams this user is a part of owns.
      ownershipEntityRefs: userInfo.ownershipEntityRefs,
    });
  });

  // ...
} 
*/