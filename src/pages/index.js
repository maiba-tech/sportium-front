// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports

import { getSession } from 'next-auth/react'
import { useState, useEffect } from 'react'




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

  useEffect(() => {
    setLoading(true)
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/athletes/`)
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
  }, [])


  if (isLoading) return <p>Loading...</p>


  if (!data) return <p>No profile data</p>

  return (

    <ApexChartWrapper>

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
