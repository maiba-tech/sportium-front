// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
// import Poll from 'mdi-material-ui/Poll'
// import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
// import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
// import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// // ** Custom Components Imports
// import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
// import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'

// import TotalEarning from 'src/views/dashboard/TotalEarning'
// import StatisticsCard from 'src/views/dashboard/StatisticsCard'
// import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
// import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import {getSession, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import React, {useState} from "react";
import DemandsTableCustomized from "../../views/demands/DemandsTableCustomized";
import CoachDashboardTable from "../../views/coach-dashboard/CoachDashboardTable";
import CardFooter from "../../views/coach-dashboard/Card/CardFooter";
import {
  Accessibility,
  DateRange, GradeTwoTone,

  // Info,
  LocalOffer, PendingActions, PeopleOutlined,
  Person,

  // SecurityUpdateWarning,
  // SupervisedUserCircle,
  // Warning
} from "@mui/icons-material";

// import Danger from "../../views/coach-dashboard/Typography/Danger";
import CardIcon from "../../views/coach-dashboard/Card/CardIcon";
import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import {makeStyles} from "@mui/styles";
import Card from "../../views/coach-dashboard/Card/Card"
import CardHeader from "../../views/coach-dashboard/Card/CardHeader"
import {Alert, Icon} from "@mui/material";
import GridItem from "../../views/coach-dashboard/Grid/GridItem";
import {FaceManProfile, Store, Update} from "mdi-material-ui";
import GridContainer from "../../views/coach-dashboard/Grid/GridContainer";

export async function getServerSideProps(context) {
  const session = await getSession(context)

  // if the user is already logged in
  if (!session) {
    return {
      redirect: {
        destination: '/pages/login',
        permanent: false
      }
    }
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/athletes/${session.user.id}`)
  const body = await res.json()
  if (res.status === 200) {
    const groupsRes= await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/groups/coach/${session.user.id}`)
    const grpBody = await groupsRes.json()
    if(groupsRes.status===202){

      return {
        props: {
          data: body,
          groups: grpBody,
          session: session
        }
      }
    }

      return {
      props: {
        data: body,
        session: session
      }
    }
  } else
    return {
      props: {
        data: 'body'
      }
  }
}

const Dashboard = props => {
  const { status, data } = useSession()
  const router = useRouter()
  const [value, setValue] = useState('coach-dashboard')
  const useStyles = makeStyles(styles);
  const classes = useStyles();


  return (
    <ApexChartWrapper>
      <Grid item xs={12} md={12} >
        <Grid container spacing={4}>

          <Grid item xs={22}>
            <GridContainer>
              <GridItem xs={12} sm={6} md={4}>
                <Card>
                  <CardHeader color="warning" stats icon>
                    <CardIcon color="warning">
                      <Person/>
                    </CardIcon>
                    <p className={classes.cardCategory}>Athletes</p>
                    <h3 className={classes.cardTitle}>
                      { props.groups.reduce(
                        (accumulator, currentValue)=>
                          accumulator + currentValue.nbParticipants,0)} <small></small>
                    </h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>

                      <PeopleOutlined />
                        Get more athletes
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={4}>
                <Card>
                  <CardHeader color="dark" stats icon>
                    <CardIcon color="dark">
                      <PendingActions />
                    </CardIcon>
                    <p className={classes.cardCategory}>Sessions</p>
                    <h3 className={classes.cardTitle}>{
                      props.groups.reduce(
                        (accumulator, currentValue)=>
                          accumulator + currentValue.nbSession,0)
                    }</h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <DateRange />
                      Last 24 Hours
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={4}>
                <Card>
                  <CardHeader color="danger" stats icon>
                    <CardIcon color="success">
                      <GradeTwoTone/>
                    </CardIcon>
                    <p className={classes.cardCategory}>FeedBack</p>
                    <h3 className={classes.cardTitle}>4.3 /5</h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <LocalOffer />
                      Tracked from Programs
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={4}>
                <Card>
                  <CardHeader color="info" stats icon>
                    <CardIcon color="info">
                      <Accessibility />
                    </CardIcon>
                    <p className={classes.cardCategory}>Subscribers</p>
                    <h3 className={classes.cardTitle}>+245</h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <Update />
                      Just Updated
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item xs={12} md={12}>
        {
          props.groups.length > 2?
            (
              <Grid item xs={22} md={8}>
                <Trophy name={props.data.firstName} group={props.groups.length} />
              </Grid>
            ):
            (
              <Grid >
               </Grid>
            )
        }
        <Grid item xs={22} md={8} >
          <Grid container spacing={6}>

            <Grid item xs={22}>
              {
                props.groups.length > 0 ?
                  (
                    <Card>
                      <CardHeader title='Groups Table' titleTypographyProps={{ variant: 'h4' }} />
                      <CoachDashboardTable groups={props.groups}/>
                    </Card>) :
                  (
                    <Alert severity="warning">There is no groups to show</Alert>
                  )
              }
            </Grid>
          </Grid>
        </Grid>



      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
