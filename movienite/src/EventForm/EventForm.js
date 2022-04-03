import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import {Divider, FormControl} from '@mui/material';
import { Button } from '@mui/material';
import SingleSearch from './SingleSearch';
import MultiSearch from './MultiSearch';
import './EventForm.css';
import {useForm} from 'react-hook-form';
import MovieSearchAutoComplete
  from '../components/form/MovieSearchAutoComplete';
import AutoCompleteWithMulti from '../components/form/AutoCompleteMultiSelect';
import {InputDateTime} from '../components/form/InputDateTime';

const MovieSearchOptions = [
  {label: "Movie 1"},{label: "Movie 2"},{label: "Movie 3"},{label: "Movie 4"},{label: "Movie 5"},{label: "Movie 6"},{label: "Movie 7"}]
const FriendLists = [
  {label: 'Oliver Hansen'},
  {label: 'Van Henry'},
  {label: 'April Tucker'},
  {label: 'Ralph Hubbard'},
  {label: 'Omar Alexander'},
  {label: 'Carlos Abbott'},
  {label: 'Miriam Wagner'},
  {label: 'Bradley Wilkerson'},
  {label: 'Kelly Snyder'}];

const defaultValues = {
  location: "",
  dateTime: new Date(),
  invitedFriendList: [],
  movie: ""
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
