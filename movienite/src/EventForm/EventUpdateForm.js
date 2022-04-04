import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import {Divider, FormControl, Stack} from '@mui/material';
import { Button } from '@mui/material';
import SingleSearch from './SingleSearch';
import MultiSearch from './MultiSearch';
import './EventForm.css';
import {useForm} from 'react-hook-form';
import MovieSearchAutoComplete
  from '../components/form/MovieSearchAutoComplete';
import AutoCompleteWithMulti from '../components/form/AutoCompleteMultiSelect';
import {InputDateTime} from '../components/form/InputDateTime';
import InputText from '../components/form/InputText';
import convertArrayToLabel from '../utils/convertArrayToLabel';

export const MovieSearchOptions = convertArrayToLabel(['Uncharted', 'Pulp Fiction', 'Spirited Away', 'The Dark Knight', 'The Matrix', 'Spider-Man: Into the Spider-Verse'])

export const FriendLists = [
  {label: 'Oliver Hansen'},
  {label: 'Van Henry'},
  {label: 'April Tucker'},
  {label: 'Ralph Hubbard'},
  {label: 'Omar Alexander'},
  {label: 'Carlos Abbott'},
  {label: 'Miriam Wagner'},
  {label: 'Bradley Wilkerson'},
  {label: 'Kelly Snyder'},
  {label: 'Beatriz'},
  {label: 'Hanna'},
  {label: 'Joel'},
  {label: 'Eric'},
  {label: 'Charles'}
]

const defaultValues = {
  location: "",
  dateTime: new Date(),
  invitedFriendList: [{label: 'Oliver Hansen'},
    {label: 'Van Henry'}],
  movie: {label: ''}
}

export default function EventUpdateForm() {
  const { handleSubmit, control, watch, setValue } = useForm({defaultValues: defaultValues});

  const onSubmit = (data) => {
    console.log(data);
  }
  return (
      <FormControl
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            padding: '20px',
            margin:'20px'
          }}
          noValidate
          autoComplete="off"
      >

        <Stack spacing={3}>
          <MovieSearchAutoComplete items={MovieSearchOptions} label={"Movie"} name={'movie'} control={control} placeholder={'Movie'}/>

          <InputText label={'Location'} name={'location'} control={control}/>


          <AutoCompleteWithMulti control={control} name={'invitedFriendList'} label={'Friend'} items={FriendLists} placeholder={'Invite your friends'} />


          <InputDateTime label={'DateTime'} name={'dateTime'} control={control} />
        </Stack>


        <div className={'container'}>
          <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 750,
                justifyContent: 'space-evenly' }}
              elevation={0}
          >
            <Button sx={{width: '100%'}} size="large" variant="contained" type="submit" >Schedule</Button>
          </Paper>
        </div>
      </FormControl>
  );
}
