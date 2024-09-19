import { ISpec } from "@veecode-platform/backstage-plugin-kong-service-manager-common";

export const addSelectedSpec = (spec:ISpec)=>({
    type: 'ADD_SPEC',
    payload: spec
} as const);

export const removeSelectedSpec = () => ({
    type: 'REMOVE_SPEC',
    payload: null
} as const);

export type SelectedSpecActionType = ReturnType<typeof addSelectedSpec | typeof removeSelectedSpec >;