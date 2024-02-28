/* eslint-disable @backstage/no-undeclared-imports */
import React, { useContext } from 'react'
import { BoxComponent, EmptyStateComponent } from '../shared'
import { Box, makeStyles } from '@material-ui/core'
import { PluginsCards } from './PluginsCards';
import { KongServiceManagerContext } from '../context';
import { useEntity } from '@backstage/plugin-catalog-react';
import { useEntityAnnotation } from '../../hooks';
import useAsync from 'react-use/lib/useAsync';
import { CardTab, Progress, TabbedCard } from '@backstage/core-components';

const useStyles = makeStyles(theme=>({
   wrapper:{
      paddingTop: theme.spacing(4),
   },
   emptyContent:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh'
   }
}));


export const PluginsList = () => {

  const { listAllEnabledPlugins, allEnabledPlugins ,listAssociatedPlugins, allAssociatedPlugins} = useContext(KongServiceManagerContext);
  const { entity } = useEntity();
  const { serviceName,kongInstance } = useEntityAnnotation(entity);
  const { wrapper, emptyContent } = useStyles();

  const getPluginsEnabled = async () => {
    await listAllEnabledPlugins(kongInstance as string);
  };

  const getAssociatedPlugins = async () => {
    await listAssociatedPlugins(serviceName as string,kongInstance as string);
  };

  const { loading, error } = useAsync(async (): Promise<void> => {
    getPluginsEnabled();
    getAssociatedPlugins();
  }, []);

  if (loading) return <Progress />;

  if(error) return <EmptyStateComponent/>;

  return (
    <BoxComponent title="Kong Plugins">
      <Box className={wrapper}>
        <TabbedCard title="">
          <CardTab label="All Plugins">
            <PluginsCards allEnabledPlugins={allEnabledPlugins} allAssociatedPlugins={allAssociatedPlugins}/>
          </CardTab>
          <CardTab label="Associated Plugins">
            { (allAssociatedPlugins && allAssociatedPlugins.length >= 1) ? (
              <PluginsCards allEnabledPlugins={allEnabledPlugins} allAssociatedPlugins={allAssociatedPlugins} filterByAssociated/>
            ) :
              (<div className={emptyContent}> No data to display ...</div>)
            }
          </CardTab>
        </TabbedCard>
      </Box>
    </BoxComponent>
  );
}
