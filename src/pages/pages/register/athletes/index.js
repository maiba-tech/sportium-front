import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useRef, useState, Fragment, forwardRef } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Icons Imports
import Google from 'mdi-material-ui/Google'
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import Select from '@mui/material/Select'
import 'bootstrap/dist/css/bootstrap.min.css'

import MenuItem from '@mui/material/MenuItem'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

import axios from 'axios'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import { useSession } from 'next-auth/react'

//export { AddEdit };
const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const AddEdit = () => {
  //const user =;
  //const isAddMode = true;
 const router = useRouter()
  const theme = useTheme()


  // form validation rules
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().required('Email is required'),
    password: Yup.string()
      .transform(x => (x === '' ? undefined : x))
      .concat(Yup.string().required('Password is required'))
      .min(8, 'Password must be at least 8 characters')
      .matches(/[0-9]/, 'Password requires a number')
      .matches(/[a-z]/, 'Password requires a lowercase letter')
      .matches(/[A-Z]/, 'Password requires an uppercase letter')
      .matches(/[^\w]/, 'Password requires a symbol'),
    date: Yup.date()
      .required('Date of birth is required')
      .max('2010-01-01', 'The minimum DOB is 2010-01-01!')
      .min('1950-01-01', 'The minimum DOB is 1950-01-01!'),
    passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    height: Yup.number()
      .typeError('you must specify a number')
      .required('Height is required')
      .min(1, 'Height should be greater than 1 meter')
      .max(2.5, 'Height must be less than 2.5 meter')
      .default(150),
    weight: Yup.number()
      .typeError('you must specify a number')
      .required('Weight is required')
      .min(40, 'Weight should be greater than 40 kg')
      .max(140, 'Weight must be less than 140 kg')
      .default(50)
  })
  const formOptions = { resolver: yupResolver(validationSchema) }
  const { register, handleSubmit, reset, formState } = useForm(formOptions)
  const { errors } = formState



  const sendData = async (values) => {
    let dob = values.date.getFullYear()+"-"+(parseInt(values.date.getMonth())+1)+"-"+values.date.getDate();
    {
      await axios
        .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/athletes/create`, {
          password: values.password,
          email: values.email,
          lastName: values.lastName,
          firstName: values.firstName,
          height: values.height,
          weight: values.weight,
          gender: values.gender,
          birthDate: dob
        })
        .then(response => {
          console.log(response)
          router.push('/pages/login/')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  function onSubmit(data) {
    //return  createUser(data);
    console.log(data)
    sendData(data);
  }

return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg
              width={35}
              height={29}
              version='1.1'
              viewBox='0 0 30 23'
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
            >
              <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                <g id='Artboard' transform='translate(-95.000000, -51.000000)'>
                  <g id='logo' transform='translate(95.000000, 50.000000)'>
                    <path
                      id='Combined-Shape'
                      fill={theme.palette.primary.main}
                      d='M30,21.3918362 C30,21.7535219 29.9019196,22.1084381 29.7162004,22.4188007 C29.1490236,23.366632 27.9208668,23.6752135 26.9730355,23.1080366 L26.9730355,23.1080366 L23.714971,21.1584295 C23.1114106,20.7972624 22.7419355,20.1455972 22.7419355,19.4422291 L22.7419355,19.4422291 L22.741,12.7425689 L15,17.1774194 L7.258,12.7425689 L7.25806452,19.4422291 C7.25806452,20.1455972 6.88858935,20.7972624 6.28502902,21.1584295 L3.0269645,23.1080366 C2.07913318,23.6752135 0.850976404,23.366632 0.283799571,22.4188007 C0.0980803893,22.1084381 2.0190442e-15,21.7535219 0,21.3918362 L0,3.58469444 L0.00548573643,3.43543209 L0.00548573643,3.43543209 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 L15,9.19354839 L26.9548759,1.86636639 C27.2693965,1.67359571 27.6311047,1.5715689 28,1.5715689 C29.1045695,1.5715689 30,2.4669994 30,3.5715689 L30,3.5715689 Z'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='0 8.58870968 7.25806452 12.7505183 7.25806452 16.8305646'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='0 8.58870968 7.25806452 12.6445567 7.25806452 15.1370162'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='22.7419355 8.58870968 30 12.7417372 30 16.9537453'
                      transform='translate(26.370968, 12.771227) scale(-1, 1) translate(-26.370968, -12.771227) '
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='22.7419355 8.58870968 30 12.6409734 30 15.2601969'
                      transform='translate(26.370968, 11.924453) scale(-1, 1) translate(-26.370968, -11.924453) '
                    />
                    <path
                      id='Rectangle'
                      fillOpacity='0.15'
                      fill={theme.palette.common.white}
                      d='M3.04512412,1.86636639 L15,9.19354839 L15,9.19354839 L15,17.1774194 L0,8.58649679 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 Z'
                    />
                    <path
                      id='Rectangle'
                      fillOpacity='0.35'
                      fill={theme.palette.common.white}
                      transform='translate(22.500000, 8.588710) scale(-1, 1) translate(-22.500000, -8.588710) '
                      d='M18.0451241,1.86636639 L30,9.19354839 L30,9.19354839 L30,17.1774194 L15,8.58649679 L15,3.5715689 C15,2.4669994 15.8954305,1.5715689 17,1.5715689 C17.3688953,1.5715689 17.7306035,1.67359571 18.0451241,1.86636639 Z'
                    />
                  </g>
                </g>
              </g>
            </svg>
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Adventure starts here 🚀
            </Typography>
            <Typography variant='body2'>ILISI makes your app management easy and fun!</Typography>
          </Box>
          {/*<form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>*/}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='form-group'>
              <div className='form-group col mb-4'>
                <label>First Name</label>
                <TextField
                  name='firstName'
                  type='text'
                  {...register('firstName')}
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                />
                <div className='invalid-feedback'>{errors.firstName?.message}</div>
              </div>
              <div className='form-group col mb-4'>
                <label>Last Name</label>
                <TextField
                  name='lastName'
                  type='text'
                  {...register('lastName')}
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                />
                <div className='invalid-feedback'>{errors.lastName?.message}</div>
              </div>
              <div className='form-group col mb-4'>
                <label>Date Of Birth</label>
                <TextField
                  TextField
                  fullWidth
                  type='date'
                  id='Date Of Birth'
                  placeholderText='MM-DD-YYYY'
                  sx={{ marginBottom: 4 }}
                  required={true}
                  {...register('date')}
                  className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                />
                <div className='invalid-feedback'>{errors.date?.message}</div>
              </div>
            </div>
            <div className='form-group'>
              <div className='form-group col'>
                <label>Email</label>
                <TextField
                  name='email'
                  type='email'
                  {...register('email')}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                />
                <div className='invalid-feedback'>{errors.email?.message}</div>
              </div>
              <div className='form-group col mb-4'>
                <label>Password</label>
                <TextField
                  name='password'
                  type='password'
                  {...register('password')}
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                />
                <div className='invalid-feedback'>{errors.password?.message}</div>
              </div>
              <div className='form-group col mb-4'>
                <label>Confirm Password </label>
                <TextField

                  name='passwordConfirmation'
                  type='password'
                  {...register('passwordConfirmation')}
                  className={`form-control ${errors.passwordConfirmation ? 'is-invalid' : ''}`}
                />
                <div className='invalid-feedback'>{errors.passwordConfirmation?.message}</div>
              </div>
              <div className='form-group col mb-4'>
                <label className='mb-2'>Gender </label>
                <select name='gender' id='gender'  {...register('gender')} className={'form-select form-select-lg '}>
                  <option value='m'>Male</option>
                  <option value='f'>Female</option>
                </select>
              </div>
              <div className='form-group col mb-4'>
                <label>Height </label>
                <TextField
                  name='height'
                  type='text'
                  {...register('height')}
                  className={`form-control ${errors.height ? 'is-invalid' : ''}`}
                />
                <div className='invalid-feedback'>{errors.height?.message}</div>
              </div>
              <div className='form-group col mb-4'>
                <label>Weight </label>
                <TextField
                  name='weight'
                  type='number'
                  {...register('weight')}
                  className={`form-control ${errors.weight ? 'is-invalid' : ''}`}
                />
                <div className='invalid-feedback'>{errors.weight?.message}</div>
              </div>
            </div>
            <div className='form-group mb-4'>
              <button type='submit' disabled={formState.isSubmitting} className='btn btn-primary mr-2'>
                {formState.isSubmitting && <span className='spinner-border spinner-border-sm mr-1'></span>}
                Save
              </button>
              <button
                onClick={() => reset(formOptions.defaultValues)}
                type='button'
                disabled={formState.isSubmitting}
                className='btn btn-secondary'
              >
                Reset
              </button>
              <Link href='/' class='btn btn-info'>
                Cancel
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}
AddEdit.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default AddEdit
