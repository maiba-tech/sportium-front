// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'


import dynamic from 'next/dynamic'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'

// ** Demo Tabs Imports
const TabAccount = dynamic(() => import('src/views/account-settings/TabAccount'), {
  loading: () => 'Loading ... '
})

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

// use session import
import { getSession, useSession } from 'next-auth/react'
import {  useRouter } from 'next/router'

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

export async function getServerSideProps(context) {
  const session = await getSession(context)

  // get the athlete profile by ID
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/athletes/${session.user.id}`)
  const body = await res.json()
  console.log(body);
  if (res.status === 200) {
    console.log(body)

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

const AccountSettings = props => {
  const { status, data } = useSession()
  const router = useRouter()

  // ** State
  const [value, setValue] = useState('account')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='account'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>Account</TabName>
              </Box>
            }
          />
          
        </TabList>

        <TabPanel sx={{ p: 0 }} value='account'>
          <TabAccount
            id={props.session.user.id}
            image={props.session.user.image}
            firstName={props.data.firstName}
            lastName={props.data.lastName}
            email={props.data.email}
            weight={props.data.weight}
            height={props.data.height}
            role={props.data.roles[0].name}
            gender={(props.data.gender=='M' || props.data.gender=='m' )? 'Male':'Female'}
          />
        </TabPanel>
        
      </TabContext>
    </Card>
  )
}

export default AccountSettings
