import * as React from 'react';
import Paper from '@mui/material/Paper';
import {Divider, FormControl} from '@mui/material';
import { Button } from '@mui/material';
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
  invitedFriendList: [],
  movie: {label: ''}
}

export default function EventForm() {
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
        <div className={'container'}>
          <Paper
              sx={{ p: '7px 10px', display: 'flex', alignItems: 'center', width: 750 }}
              elevation={1}
          >
            <MovieSearchAutoComplete items={MovieSearchOptions} label={"Movie"} name={'movie'} control={control} placeholder={'Movie'}/>
          </Paper>
        </div>
        <Divider variant="middle" sx={{ p: '10px' }}/>

        <div className={'container'}>
          <Paper
              sx={{ p: '7px 10px', display: 'flex', alignItems: 'center', width: 750 }}
              elevation={1}
          >
            <InputText label={'Location'} name={'location'} control={control}/>
          </Paper>
        </div>
        <Divider variant="middle" sx={{ p: '10px' }}/>

        <div className='container'>
          <Paper
              sx={{ p: '7px 10px', display: 'flex', alignItems: 'center', width: 750}}
          >
            <AutoCompleteWithMulti control={control} name={'invitedFriendList'} label={'Friend'} items={FriendLists} placeholder={'Invite your friends'} />
          </Paper>
        </div>
        <Divider variant="middle" sx={{ p: '10px', m: '5px' }}/>

        <div className={'container'}>
          <Paper
              sx={{ p: '7px 10px', display: 'flex', alignItems: 'center', width: 750,
                justifyContent: 'space-evenly' }}
              elevation={1}
          >
            <InputDateTime label={'DateTime'} name={'dateTime'} control={control} />
          </Paper>
        </div>
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
