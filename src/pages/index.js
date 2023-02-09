// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports

import { getSession } from 'next-auth/react'
import React, { useState, useEffect } from 'react'
import { Alert } from "@mui/material";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';




//
export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/pages/accueil',
        permanent: false
      }
    }
  }

  return { props: { session: session } }
}


const Dashboard = (props) => {

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [notified, setNotified] = useState(false)
  const [message, setMessage] = useState(null)


  useEffect(() => {

    setLoading(true)
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/athletes/`)
      .then(res => res.json())
      .then(data => {
        setData(data)
        console.log('*****************************data:');
        setLoading(false)
      })

    const socket = new SockJS('http://localhost:8080/ws');
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, (frame) => {
      console.log('Connected: !!!' + frame);
      stompClient.send('/app/application', {},
        JSON.stringify(
          {
            title: "Greeting",
            description: "Hello "
          }))
      setNotified(false)
      stompClient.subscribe('/all/group-notification', (message) => {
        console.log('Received message: ', message.body);
        console.log(' message: ' +
          JSON.parse(message.body)['description']);
        setMessage(JSON.parse(message.body))
        setNotified(true)
      });
    })

    if (stompClient.connected) {
      console.log("jkfcnfjvnfk")
      stompClient.subscribe('/all/group-notification', (message) => {
        console.log('Received message: ', message.body);
        console.log(' message: ', message.body.description);
      });
    }

    //
    // stompClient.send('/app/application', {}, JSON.stringify("hello !"))
    //  socket.onmessage = function(event) {
    //    console.log("Message received: " + event.data);
    //  };
  }
    , [])



  if (isLoading) return <p>Loading...</p>


  if (!data) return <p>No profile data</p>

  return (

    <ApexChartWrapper>
      {
        notified ?
          (
            <Grid container spacing={6}>
              <Alert severity="info">{message['description']}</Alert>
            </Grid>
          ) : (
            <Grid></Grid>
          )
      }
      <Grid container spacing={6}>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={6}>
            {data.map(namelist => (
              <Grid item xs={6} key={namelist.image_url}>
                <CardStatisticsVerticalComponent
                  stats={namelist.firstName}
                  icon={namelist.image_url}
                  title={namelist.roles.map(role => { return role['name'] }).join("\r\n")}
                />
              </Grid>
            ))}
          </Grid>{' '}
        </Grid>{' '}
      </Grid>{' '}
    </ApexChartWrapper>
  )
}

export default Dashboard
