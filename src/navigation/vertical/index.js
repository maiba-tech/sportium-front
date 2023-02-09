// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import { Calendar } from 'mdi-material-ui'
import { Roofing } from '@mui/icons-material'


const navigation = (session) => {
  var verticalNavigationItems
  if(typeof(session) === 'undefined' || typeof(session.user) === 'undefined' || typeof(session.user.roles) === 'undefined'){
    verticalNavigationItems =  [
      {
        sectionTitle: 'Empty Section'
      },
    ]
  }
  else {
    const roles = session.user.roles
    if(roles){
      if(roles.some(e => e.name === 'ADMIN')){
        verticalNavigationItems = [
          {
            sectionTitle: 'Admin'
          },
          {
            title: 'Demands',
            icon: FormatLetterCase,
            path: '/demands'
          },
          {
            title: 'Account Settings',
            icon: AccountCogOutline,
            path: '/account-settings'
          },
          {
            title: 'Home page',
            icon: Roofing,
            path: '/homepage'
          },
        ]
      } else if(roles.some(e => e.name === 'COACH')){
        verticalNavigationItems = [
          {
            sectionTitle: 'Athlete'
          },
          {
            title: 'Dashboard',
            icon: HomeOutline,
            path: '/'
          },
          {
            title: 'GroupsDashboard',
            icon: GoogleCirclesExtended,
            path: '/coach-dashboard'
          },
          {
            title: 'Account Settings',
            icon: AccountCogOutline,
            path: '/account-settings'
          },
          {
            sectionTitle: 'Coach'
          },
          {
            title: 'Programs',
            icon: Calendar,
            path: '/programs'
          },
          {
            title: 'Home page',
            icon: Roofing,
            path: '/homepage'
          },
        ]
      } else if(roles.some(e => e.name === 'ATHLETE') || roles.some(e => e.name === 'COACH_PENDING')){
        verticalNavigationItems = [
          {
            sectionTitle: 'Athlete'
          },
          {
            title: 'Dashboard',
            icon: HomeOutline,
            path: '/'
          },
          {
            title: 'Account Settings',
            icon: AccountCogOutline,
            path: '/account-settings'
          },
          {
            title: 'Home page',
            icon: Roofing,
            path: '/homepage'
          },
          {
            title: 'Progress',
            icon: Calendar,
            path: '/sessions-progress'
          },
        ]
      }
    }
  }

return verticalNavigationItems

}

export default navigation
