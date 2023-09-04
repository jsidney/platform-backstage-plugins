import { Entity } from '@backstage/catalog-model';

export const GITLAB_ANNOTATION = 'gitlab.com/project-slug';

export const useEntityAnnotations = (entity: Entity) => {
  const projectName =
    entity?.metadata.annotations?.['gitlab.com/project-slug'] ?? '';
 
  return {
    projectName
  };

};