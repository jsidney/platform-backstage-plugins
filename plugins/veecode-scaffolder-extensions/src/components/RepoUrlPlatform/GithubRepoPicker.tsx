/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Select, SelectItem } from '@backstage/core-components';
import { RepoUrlPickerState } from './types';
import { useScaffolder } from '../../hooks/useScaffolder';
import { Grid, Input, InputLabel } from '@material-ui/core';
import { getUserAndOrgs } from '../../services';

const messageLoading = "loading ...";

export const GithubRepoPicker = (props: {
  allowedOwners?: string[];
  rawErrors: string[];
  state: RepoUrlPickerState;
  hosts?: string[];
  onChange: (state: RepoUrlPickerState) => void;
}) => {
  const { allowedOwners = [], rawErrors, state, onChange , hosts} = props;
  const ownerItems: SelectItem[] | SelectItem  = allowedOwners
    ? allowedOwners.map(i => ({ label: i, value: i }))
    : [{ label: 'Loading...', value: 'loading' }];

  const { owner } = state;

  const [ownerData, setOwnerData ] = useState<string>(messageLoading);
  const [items, setItems] = useState<string[]>();
  const [hasIntegration, setHasIntegration] = useState<boolean>(false);
  const [ownerList, setOwnerList] = useState<SelectItem[]>();
  const { githubScaffolderExists, githubTokenScaffolder, githubHostScaffolder } = useScaffolder();

  const itemsList = (data:string[]) : SelectItem[] => {
    if(data !== undefined){
      const owners:SelectItem[] = []
      data.forEach((item : string) =>{
         owners.push({
          label: item,
          value: item
        })
      })
      return owners;
    }
    return [{
      label: messageLoading,
      value: messageLoading
    }]
  }

  useEffect(()=>{
    async function fetchData(){
      const params = {provider: 'github', host: githubHostScaffolder, token: githubTokenScaffolder};
      const getData = getUserAndOrgs(params); 
      try{
        const user = (await getData).username;
        const organizations = (await getData).organizations;
        if(user !== "Not found")
        { const ownerDataResult = [user, ...organizations];
          setOwnerData(user);
          setItems(ownerDataResult);
          setHasIntegration(true)
        } else {
          const ownerDataResult = ["No owner available"];
          setOwnerData("No owner available");
          setItems(ownerDataResult);
          setHasIntegration(false)
        }
      }catch(err:any){
        throw new Error(err)
      }
    }
    if(!hosts?.includes('github') || githubScaffolderExists ){
      fetchData()
    }
},[]);

useEffect(()=>{
  const data = itemsList(items as string[]);
  setOwnerList( data !== undefined ? data : [{label: messageLoading, value: messageLoading}]);
},[items]);

useEffect(()=>{
  onChange({ owner: ownerData as string })
},[ownerData])


  
  return (
    <>
      <FormControl
        margin="normal"
        required
        error={rawErrors?.length > 0 && !ownerData}
      >
        {
          hasIntegration ? (
            <>
              {allowedOwners?.length ? (
                    <Select
                      native
                      label="Owner Available"
                      onChange={s =>
                        onChange({ owner: String(Array.isArray(s) ? s[0] : s) })
                      }
                      disabled={allowedOwners.length === 1}
                      selected={owner ?? ""}
                      items={ownerItems}
                    />
                     ) : (
                    <>
                      <Grid item style={{marginBottom:'1rem'}}>
                        <Select        
                          native
                          label="Owner"
                          onChange={s =>
                            onChange({ owner: String(Array.isArray(s) ? s[0] : s) })
                          }
                          disabled={allowedOwners.length === 1}
                          selected={ownerData}
                          items={ownerList as SelectItem[]}
                        />
                      </Grid>
                    </>
                  )}
            </>
          ) : (
            <>
              {allowedOwners?.length ? (
                <Select
                  native
                  label="Owner Available"
                  onChange={s =>
                    onChange({ owner: String(Array.isArray(s) ? s[0] : s) })
                  }
                  disabled={allowedOwners.length === 1}
                  selected={owner}
                  items={ownerItems}
                />
              ) : (
                <>
                  <InputLabel htmlFor="ownerInput">Owner</InputLabel>
                  <Input
                    id="ownerInput"
                    onChange={e => onChange({ owner: e.target.value })}
                    value={owner}
                  />
                </>
              )}
          </>
          )
        }
        <FormHelperText>
          The organization, user or project that this repo will belong to
        </FormHelperText>
      </FormControl>
    </>
  );
};
