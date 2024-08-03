import { Entity } from "@backstage/catalog-model";
import { GITHUB_ANNOTATION, WORKFLOW_ANNOTATION } from "../../utils/constants/annotations";

export const isGithubWorkflowsAvailable = (entity: Entity) =>
  !!entity?.metadata.annotations?.[WORKFLOW_ANNOTATION];

  export const isGithubAvailable = (entity: Entity) =>
  !!entity?.metadata.annotations?.[GITHUB_ANNOTATION];