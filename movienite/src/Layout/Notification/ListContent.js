import React from 'react';
import {Avatar, ListItemAvatar, ListItemText} from '@mui/material';
import Box from '@mui/material/Box';

const ListContent = ({ item, index, handleOpen }) => {
  return (
      <>
        <ListItemAvatar>
          <Avatar alt={item.sender.name} src={item.sender.avatar} />
        </ListItemAvatar>
        <ListItemText
            primary={item.sender.name}
            secondary={
              <>
                <Box
                    component={"span"}
                    sx={{
                      display: "inline",
                      pr: "5px",
                      color: "black",
                      fontSize: "1rem",
                    }}
                    onClick={() => handleOpen(index)}
                >
                  {`Movie: ${item.movie.name}`}
                </Box>
                <br />
                {item.movie.description}
              </>
            }
        />
      </>
  );
};

export default ListContent;
