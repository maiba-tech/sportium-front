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
import { useSession } from 'next-auth/react'

const navigation = () => {
  const {status, data } = useSession();
  console.log(data);

  if(status === "authenticated")
    return [
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
        sectionTitle: 'Pages'
      }
    ];

  if(status === "unauthenticated")
    return [
      {
        title: 'Dashboard',
        icon: HomeOutline,
        path: '/'
      },
      {
        sectionTitle: 'Pages'
      },
      {
        title: 'Login',
        icon: Login,
        path: '/pages/login',
        openInNewTab: true
      },
      {
        title: 'Register',
        icon: AccountPlusOutline,
        path: '/pages/register',
        openInNewTab: true
      },
    ]

  return [
    {
      title: 'loading ... ',
      icon: AccountPlusOutline,
      path: '/pages/register',
      openInNewTab: true
    },
  ]
}

export default navigation
