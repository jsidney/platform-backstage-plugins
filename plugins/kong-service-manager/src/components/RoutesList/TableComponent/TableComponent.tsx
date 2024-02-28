import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import {
  Table,
  TableColumn} from '@backstage/core-components';
import { RoutesResponse } from '../../../utils/types';

interface TableComponentProps {
  dataProps: RoutesResponse[] | []
}  

interface TableData {
  name: string,
  protocols: string[],
  methods: string[],
  hosts: string[],
  paths: string[],
  tags: string[]
}

export const TableComponent = ({dataProps}:TableComponentProps) => {

  const generateData = (rowData: RoutesResponse[] | [] | null) => {
    const data: Array<TableData> = [];
    if(rowData){
      rowData.map(r => {
        data.push({
          name: r.name,
          protocols: r.protocols,
          methods: r.methods,
          hosts: r.hosts,
          paths: r.paths,
          tags: r.tags
        });
      })   
    }
    return data;
  };
  
  const columns: TableColumn[] = [
    {
      title: 'Name',
      field: 'name',
      highlight: true,
      type: 'string',
      align: 'center',
      width: '300px'
    },
    {
      title: 'Protocols',
      highlight: true,
      render: (row: Partial<TableData>) => (
        <>
          {
            row.protocols ?
            row.protocols.map(protocol => (
              <Typography variant="body2" key={protocol}>{protocol}</Typography>
            ))
            : ' - '
          }
        </>
      ),
      align: 'center',
      width: 'auto'
    },
    {
      title: 'Methods',
      highlight: true,
      render: (row: Partial<TableData>) => (
        <>
          {
            row.methods ?
            row.methods.map(method => (
              <Typography variant="body2" key={method}>{method}</Typography>
            ))
            : ' - '
          }
        </>
      ),
      align: 'center',
      width: 'auto'
    },
    {
      title: 'Hosts',
      highlight: true,
      render: (row: Partial<TableData>) => (
        <>
          { 
            row.hosts ?
            row.hosts.map(host => (
              <Typography variant="body2" key={host}>{host}</Typography>
            ))
            : ' - '
          }
        </>
      ),
      align: 'center',
      width: 'auto'
    },
    {
      title: 'Paths',
      highlight: true,
      render: (row: Partial<TableData>) => (
        <>
          {
            row.paths ?
            row.paths.map(path => (
              <Typography variant="body2" key={path}>{path}</Typography>
            ))
            : ' - '
          }
        </>
      ),
      align: 'center',
      width: 'auto'
    },
    {
      title: 'Tags',
      highlight: true,
      render: (row: Partial<TableData>) => (
        <>
          {
            row.tags ?
            row.tags.map(tag => (
              <Chip key={tag} label={tag}/>
            ))
            : ' - '
          }
        </>
      ),
      align: 'center',
      width: 'auto'
    },
  ];

  return (
      <Table
        options={{ paging: true, padding: 'dense',minBodyHeight:'55vh',paginationType:'stepped', paginationPosition:'bottom' }}
        data={generateData(dataProps)}
        columns={columns}
        title=""
        style={{marginTop: '-2rem', width: '100%', height:'100%'}}
      />
  );
};