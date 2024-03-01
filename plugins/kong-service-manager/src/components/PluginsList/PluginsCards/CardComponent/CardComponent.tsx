import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@material-ui/core'
import React from 'react'
import { PluginCard } from '../PluginsCards'
import Edit from '@material-ui/icons/Edit'
import { useStyles } from '../styles'
import { CreatePlugin, PluginFieldsResponse } from '../../../../utils/types'

interface CardComponentProps {
    data: PluginCard,
    pluginFields: (pluginName: string, proxyPath: string) => Promise<PluginFieldsResponse[] | null>,
    enablePlugin?: (serviceIdOrName: string, config: CreatePlugin, proxyPath: string) => Promise<void>,
    disablePlugin: (serviceIdOrName: string, pluginId: string, proxyPath: string) => Promise<void>
}

export const CardComponent = ({data}:CardComponentProps) => {

  const {card, cardHeader, cardTitle, cardIcon,description, button} = useStyles()

  return (
    <Card key={data.name} className={card}>
      <CardHeader
        className={cardHeader}
        action={
          <>
            {data.associated ? (
              <IconButton aria-label="settings">
                {' '}
                <Edit />{' '}
              </IconButton>
            ) : (
              <></>
            )}
          </>
        }
        title={
          <Typography variant="h6" className={cardTitle}>
            {data.name}
          </Typography>
        }
      />
      <CardMedia>
        <img src={`${data.image}`} alt="" className={cardIcon} />
      </CardMedia>
      <CardContent className={description}>{data.description}</CardContent>
      <CardActions>
        <Button color="primary" variant={data.associated ? 'contained': 'outlined'} className={button}>
          Enable
        </Button>
      </CardActions>
    </Card>
  );
}
