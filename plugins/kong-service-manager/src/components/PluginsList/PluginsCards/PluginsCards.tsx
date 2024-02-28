/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @backstage/no-undeclared-imports */

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { ItemCardGrid, Content } from '@backstage/core-components';
import { AssociatedPluginsResponse } from '../../../utils/types';
import { Button, CardHeader, IconButton } from '@material-ui/core';
import ImageDefault  from '../../../assets/default.png'
import Edit from '@material-ui/icons/Edit';
import PluginsInfoData from '../../../data/plugins.json';

interface PluginsCardsProps {
  allEnabledPlugins: string[] | null | [],
  allAssociatedPlugins: AssociatedPluginsResponse[] | null | [],
  filterByAssociated?: boolean
}

interface PluginCard {
  name: string,
  associated?: boolean,
  image: string,
  tags: string[],
  description: string,
  category: string
}

const useStyles = makeStyles( theme => ({
  content:{
    minHeight: '60vh'
   },
   card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(4),
    borderRadius: '8px',
    border: `1px solid ${theme.palette.action.focus}`,
   },
   cardTitle:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.primary.main
   },
   cardEdit:{
    marginLeft: theme.spacing(3)
   },
   cardIcon:{
    width: '70px',
    height: '70px',
    objectFit: 'cover',
    borderRadius: '5px'
   },
   button:{
    border: `1px solid ${theme.palette.primary.main}`,
    width: '380px',
    padding: theme.spacing(1)
   }
}));

export const PluginsCards = ({allEnabledPlugins,allAssociatedPlugins,filterByAssociated}:PluginsCardsProps) => {

  const { content, card, cardTitle, cardEdit, cardIcon, button } = useStyles();
  const [ associatedPluginsName, setAssociatedPluginsName] = useState<string[]|[]>([]);
  const [cards, setCards] = useState<PluginCard[]|[]> ([]);

  const getAssociatedPuginsName = ( pluginsParams : AssociatedPluginsResponse[] ) => {
      const newData : string[] = []
      pluginsParams.map(p => {
        newData.push(p.name)
      })
      setAssociatedPluginsName(newData)
  };

  useEffect(()=>{
    if(allAssociatedPlugins) getAssociatedPuginsName(allAssociatedPlugins)
  },[allAssociatedPlugins])

  useEffect(()=>{
    if(allEnabledPlugins && allEnabledPlugins.length >= 1){
      const newCards : PluginCard[] = [];
      allEnabledPlugins.map(pluginName => {
        const plugin = pluginName;
        PluginsInfoData.filter(i =>{
          if(i.name === plugin){
            newCards.push({
              name: i.name,
              associated: false,
              image: i.image,
              tags: i.tags,
              description: i.description,
              category: i.category
            })
          }
        })
      })
      // eslint-disable-next-line no-console
      console.log(newCards)
      setCards(newCards)
    }
  },[allEnabledPlugins])

  return (
    <Content className={content}>
      <ItemCardGrid>
        <>
          {!filterByAssociated
            ? cards?.map(c => (
                <Card key={c.name} className={card}>
                  <CardHeader
                    action={
                      filterByAssociated ? (
                        <IconButton aria-label="settings">
                          {' '}
                          <Edit />{' '}
                        </IconButton>
                      ) : (
                        <></>
                      )
                    }
                    title={c.name}
                    className={cardTitle}
                  />
                  <CardMedia>
                    <img src={c.image ?? ImageDefault} alt="" className={cardIcon} />
                  </CardMedia>
                  <CardContent>{c.description}</CardContent>
                  <CardActions>
                    <Button color="primary" className={button}>
                      Enable
                    </Button>
                  </CardActions>
                </Card>
              ))
            : associatedPluginsName?.map(t => (
                <Card key={t} className={card}>
                  <CardHeader
                    action={
                      filterByAssociated ? (
                        <IconButton aria-label="settings" className={cardEdit}>
                          {' '}
                          <Edit />{' '}
                        </IconButton>
                      ) : (
                        <></>
                      )
                    }
                    title={t}
                    className={cardTitle}
                  />
                  <CardMedia>
                    <img src={ImageDefault} alt="" className={cardIcon} />
                  </CardMedia>
                  <CardContent>{t}</CardContent>
                  <CardActions>
                    <Button color="primary" className={button}>
                      Enable
                    </Button>
                  </CardActions>
                </Card>
              ))}
        </>
      </ItemCardGrid>
    </Content>
  );
};