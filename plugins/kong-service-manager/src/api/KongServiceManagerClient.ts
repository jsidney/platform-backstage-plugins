import { ConfigApi } from "@backstage/core-plugin-api";
import { KongServiceManagerApi, Options } from "./KongServiceManagerApi";
import { AssociatedPluginsResponse, CreatePlugin, CreateRoute, PluginFieldsResponse, PluginPerCategory, RouteResponse, RoutesResponse, ServiceInfoResponse } from "@veecode-platform/backstage-plugin-kong-service-manager-common";
// import { PluginsInfoData } from "../data/data";

class Client implements KongServiceManagerApi {

    private readonly config: ConfigApi;
    
    constructor(opts: Options) {

        this.config = opts.config as ConfigApi;
    }

    public async fetch <T = any>(input: string, init?: RequestInit): Promise<T> {

        const apiUrl = `${this.config.getString("backend.baseUrl")}/api/kong`;

        const resp = await fetch(`${apiUrl}${input}`, {
            ...init
        });

        if (!resp.ok) {
            throw new Error(`[${resp.type}] Request failed with ${resp.status} - ${resp.statusText}`);
        }

        return await resp.json();
    }

    async getServiceInfo(instanceName: string, serviceName:string): Promise<ServiceInfoResponse> {
        const response = await this.fetch(`/${instanceName}/service/${serviceName}`)
        return response.service
    }

    async getEnabledPlugins(instanceName:string, serviceName: string, searchFilter:string = ''): Promise<PluginPerCategory[]> {
        const response = await this.fetch(`/${instanceName}/services/${serviceName}/plugins?search=${searchFilter}`)
        return response.plugins
    }

    // async getAllEnabledPlugins(workspace:string,serviceIdOrName: string, proxyPath?: string, searchFilter?:string): Promise<PluginPerCategory[]> {
    //     const response = await this.fetch("/", proxyPath);     
    //     const availablePluginsResponse = Object.keys(response.plugins.available_on_server);
    //     let availablePluginsList = availablePluginsResponse;

    //     if (searchFilter !== "" && searchFilter) {
    //         availablePluginsList = availablePluginsResponse.filter(plugin =>
    //           plugin.toLowerCase().includes(searchFilter.toLowerCase())
    //         );
    //       }
          
    //     const associatedPluginsList = await this.getServiceAssociatedPlugins(workspace,serviceIdOrName, proxyPath)

    //     const mapedEnabledPluginsList = PluginsInfoData.categories.map((category) => {

    //         return {
    //             category: category.category,
    //             plugins: category.plugins.flatMap((categoryPlugin) => {
    //                 const filteredPluginMatch = availablePluginsList.find((availablePlugin) => availablePlugin === categoryPlugin.slug)
    //                 if (!filteredPluginMatch) return []
    
    //                 const filteredAssocietedPluginMatch = associatedPluginsList.find((associatedPlugin) => associatedPlugin.name === categoryPlugin.slug)
    //                 return {
    //                     id: filteredAssocietedPluginMatch?.id ?? null,
    //                     name: categoryPlugin.name,
    //                     slug: categoryPlugin.slug,
    //                     associated: filteredAssocietedPluginMatch?.enabled ?? false,
    //                     image: categoryPlugin.image,
    //                     tags: categoryPlugin.tags,
    //                     description: categoryPlugin.description
    //                 }
    //             })
    //         }
    //     })
    //     return mapedEnabledPluginsList

    // }


    async getPluginFields(instanceName:string, pluginName:string): Promise<PluginFieldsResponse[]> {
        const response = await this.fetch(`/${instanceName}/services/plugins/${pluginName}/fields`)
        return response.fields
    }

    async getServiceAssociatedPlugins(instanceName:string,serviceName:string): Promise<AssociatedPluginsResponse[]> {
        const response = await this.fetch(`/${instanceName}/services/${serviceName}/plugins/associated`)
        return response.plugins
    }

    async createServicePlugin(instanceName:string, serviceName:string, config: CreatePlugin): Promise<any> {
        const body = {
            configs: config
        }
        const headers: RequestInit = {
            method: "POST",
            body: JSON.stringify(body)
        }
        const response = await this.fetch(`/${instanceName}/services/${serviceName}/plugins`,headers)
        return response
    }

    async editServicePlugin(instanceName:string,serviceName: string, pluginId: string, config: CreatePlugin): Promise<any> {
        const body = {
            configs: config
        }
        const headers: RequestInit = {
            method: "PATCH",
            body: JSON.stringify(body)
        }
        const response = await this.fetch(`/${instanceName}/services/${serviceName}/plugins/${pluginId}`, headers)
        return response

    }

    async removeServicePlugin(instanceName:string,serviceName: string, pluginId: string): Promise<any> {

        const headers: RequestInit = {
            method: "DELETE",
        }
        const response = await this.fetch(`/${instanceName}/services/${serviceName}/plugins/${pluginId}`, headers)
        return response.message
    }

    async getRoutesFromService(instanceName:string, serviceName: string): Promise<RoutesResponse[]> {  
        const response = await this.fetch(`/${instanceName}/services/${serviceName}/routes`)
        return response.routes
    }

    async getRouteFromService(instanceName:string, serviceName: string, routeId: string): Promise<RouteResponse> {
        const response = await this.fetch(`/${instanceName}/services/${serviceName}/routes/${routeId}`);
        return response.route;
    }

    async createRouteFromService(instanceName:string, serviceName: string, config: CreateRoute): Promise<any> {
        const body = {
            ...config,
         }
        const headers: RequestInit = {
            method: "POST",
            body: JSON.stringify(body)
        }
        const response = await this.fetch(`/${instanceName}/services/${serviceName}/routes`,headers)
        return response.route
    }

    async editRouteFromService(instanceName:string, serviceName: string, routeId: string, config: CreateRoute): Promise<any> {
        const body = { 
            ...config,
         }
        const headers: RequestInit = {
            method: "PATCH",
            body: JSON.stringify(body)
        }
        const response = await this.fetch(`/${instanceName}/services/${serviceName}/routes/${routeId}`,headers)
        return response
    }

    async removeRouteFromService(instanceName:string, serviceName: string, routeId: string): Promise<any> {
        const headers: RequestInit = {
            method: "DELETE",
        }
        const response = await this.fetch(`/${instanceName}/services/${serviceName}/routes/${routeId}`, headers)
        return response.message
    }

}

export class KongServiceManagerApiClient implements KongServiceManagerApi {

    private readonly client: Client;

    constructor(opts: Options) {
        this.client = new Client(opts);
    }

    async getServiceInfo(instanceName:string, serviceName:string): Promise<ServiceInfoResponse> {
        return this.client.getServiceInfo(instanceName,serviceName)
    }

    async getEnabledPlugins(instanceName:string, serviceName:string, searchFilter:string): Promise<PluginPerCategory[]> {
        return this.client.getEnabledPlugins(instanceName,serviceName,searchFilter)
    }

    // async getEnabledPlugins(serviceName: string,instanceName:string): Promise<string[]> {
    //     return this.client.getEnabledPlugins(serviceName, instanceName)
    // }

    async getPluginFields(instanceName:string, pluginName: string): Promise<PluginFieldsResponse[]> {
        return this.client.getPluginFields(instanceName,pluginName)
    }

    async getServiceAssociatedPlugins(serviceName:string, instanceName:string ): Promise<AssociatedPluginsResponse[]> {
        return this.client.getServiceAssociatedPlugins(serviceName,instanceName)
    }

    async createServicePlugin(instanceName:string, serviceName: string, config: CreatePlugin ): Promise<any> {
        return this.client.createServicePlugin(instanceName,serviceName, config)
    }

    async editServicePlugin(instanceName:string, serviceName: string, pluginId: string, config: CreatePlugin): Promise<any> {
        return this.client.editServicePlugin(instanceName, serviceName, pluginId, config)
    }

    async removeServicePlugin(instanceName:string,serviceName: string, pluginId: string): Promise<any> {
        return this.client.removeServicePlugin(instanceName,serviceName, pluginId)
    }

    async getRoutesFromService(instanceName:string, serviceName: string): Promise<RoutesResponse[]> {
        return this.client.getRoutesFromService(instanceName,serviceName)
    }

    async getRouteFromService(instanceName:string, serviceName: string, routeId: string): Promise<any> {
        return this.client.getRouteFromService(instanceName, serviceName, routeId);
    }

    async createRouteFromService(instanceName:string, serviceName: string, config: CreateRoute): Promise<any> {
        return this.client.createRouteFromService(instanceName, serviceName, config)
    }

    async editRouteFromService(instanceName:string, serviceName: string, routeId: string, config: CreateRoute): Promise<any> {
        return this.client.editRouteFromService(instanceName, serviceName, routeId, config)
    }

    async removeRouteFromService(instanceName:string, serviceName: string, routeId: string): Promise<any> {
        return this.client.removeRouteFromService(instanceName, serviceName, routeId)
    }
}