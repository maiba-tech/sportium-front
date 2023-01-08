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
        ]
      }
    }
  }
  
return verticalNavigationItems

  // return [
  //   {
  //     sectionTitle: 'Admin'
  //   }, 
  //   {
  //     title: 'Demands',
  //     icon: FormatLetterCase,
  //     path: '/demands'
  //   },
  //   {
  //     sectionTitle: 'Athlete'
  //   }, 
  //   {
  //     title: 'Dashboard',
  //     icon: HomeOutline,
  //     path: '/'
  //   },
  //   {
  //     title: 'Account Settings',
  //     icon: AccountCogOutline,
  //     path: '/account-settings'
  //   },
  //   {
  //     sectionTitle: 'Coach'
  //   }, 
  //   {
  //     title: 'Programs',
  //     icon: Calendar,
  //     path: '/programs'
  //   }, 
  // ]
// --------------------------------------------------------------
    // {
    //   title: 'Login',
    //   icon: Login,
    //   path: '/pages/login',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Register',
    //   icon: AccountPlusOutline,
    //   path: '/pages/register',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Error',
    //   icon: AlertCircleOutline,
    //   path: '/pages/error',
    //   openInNewTab: true
    // },
    // {
    //   sectionTitle: 'User Interface'
    // },
    

    // {
    //   title: 'Icons',
    //   path: '/icons',
    //   icon: GoogleCirclesExtended
    // },
    // {
    //   title: 'Cards',
    //   icon: CreditCardOutline,
    //   path: '/cards'
    // },
    // {
    //   title: 'Tables',
    //   icon: Table,
    //   path: '/tables'
    // },
    // {
    //   icon: CubeOutline,
    //   title: 'Form Layouts',
    //   path: '/form-layouts'
    // }
  //]
}

export default navigation
