// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import { getSession } from 'next-auth/react'

//
// export async function getServerSideProps(context) {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/pages/login',
//         permanent: false
//       }
//     }
//   }

//   return { props: { session: session } }
// }
import { useState, useEffect } from 'react'

const i = 2

const Dashboard = () => {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/athletes/`)
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)

        //console.log(data[0])
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
                  title={namelist.roles[0].name}
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
