import React, { useEffect, useState } from "react";
import EventCard from './EventCard';
import EventListElement from "./EventListElement";
import axios from "axios";
import eventData from "../_mock/json/events.json";
import Box from "@mui/material/Box";
//{"data":"[{\"location\":\"44 Portage Pass\",\"host\":6,\"eventID\":17,\"dateTime\":\"2021-01-16 00:00:00\"}]","message":"操作成功","code":1}
export default function Event() {
    // const http = require('http');
    
    async function getMovieEvents() {
        const data  = await axios.get('http://localhost:8088/movieevent/hosted_event', {
            params: {
                userId: 6
            }
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // always executed
          });  

        // return data;
        // http.get('http://moive-nite.azurewebsites.net/test/oneuser?userId=6', (resp) => {
        // let data = '';

        // // A chunk of data has been received.
        // resp.on('data', (chunk) => {
        //     data += chunk;
        // });
        // console.log(data);

        // // The whole response has been received. Print out the result.
        // resp.on('end', () => {
        //     console.log(JSON.parse(data).explanation);
        // });

        // }).on("error", (err) => {
        // console.log("Error: " + err.message);
        // });
    }

    
    useEffect(() => {
        getMovieEvents();
    }, []);

    console.log(eventData.events.read);
    return (
      <Box
      // component="main"
      sx={{
        // display: "flex",
        alignItems: "center",
        // flexDirection: "column",
        pt: 10,
        width: "100%",
        justifyContent: "space-evenly",
      }}
      > 
        {eventData.events.read.map((event)=>
          <EventListElement host={event.host} 
                            invited={event.invited} 
                            movie={event.movie}
                            time={event.time}/>
        )}
        {/* <EventCard evetID={"1"} friends={"Friend1, Friend2"} time={"2021-01-16 00:00:00"}/> */}
      </Box>
  );
}
