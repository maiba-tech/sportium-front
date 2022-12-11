// ** React Imports
import { useState, useEffect, Fragment, forwardRef, useRef } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
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
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import Select from '@mui/material/Select'

import MenuItem from '@mui/material/MenuItem'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

import axios from 'axios'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { handleCertificatesChange, handleCVChange, sendCoachPendingData, sleep } from 'src/handlers/CoachFormHandlers'
import { Alert, AlertTitle, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal } from '@mui/material'
import { inputFields } from 'src/register-data/RegisterData'
import CircularIndeterminate from 'src/@core/components/sportium-comp/CircularIndeterminate'


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

const polygonStyle = [
  {
    id: 'Rectangle',
    opacity: '0.077704',
    points: '0 8.58870968 7.25806452 12.6445567 7.25806452 15.1370162',
    transform: null
  },
  {
    id: 'Rectangle',
    opacity: '0.077704',
    points: '0 8.58870968 7.25806452 12.6445567 7.25806452 15.1370162',
    transform: null
  },
  {
    id: 'Rectangle',
    opacity: '0.077704',
    points: '22.7419355 8.58870968 30 12.7417372 30 16.9537453',
    transform: 'translate(26.370968, 12.771227) scale(-1, 1) translate(-26.370968, -12.771227) '
  },
  {
    id: 'Rectangle',
    opacity: '0.077704',
    points: '22.7419355 8.58870968 30 12.6409734 30 15.2601969',
    transform: 'translate(26.370968, 11.924453) scale(-1, 1) translate(-26.370968, -11.924453) '
  }
]

// error modal style
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid',
  boxShadow: 24,
  p: 4
}

const RegisterPage = () => {

  const [openSpinner, setOpenSpinner] = useState(false); 

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  // ** States
  // ref to the first render on submission data
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  // const [open, setOpen] = useState(false)

  const [values, setValues] = useState({
    showPassword: false,
    showPassword2: false,
  })

  const isNotApproved = useRef(true)

  const [certificates, setCertificates] = useState([]);
  const [cv, setCv] = useState(null);
  const router = useRouter()


  const onSubmit = (data) => {

    if(isNotApproved.current)
    {
      handleClickOpen()
      handleCertificatesChange(setCertificates, data.certificates)
      handleCVChange(setCv, data.cv[0])

      isNotApproved.current = false
    } else {
      setOpenSpinner(true)
      data.certificates = certificates
      data.cv = cv

      console.log(data)

      sendData(data)

    }
  }

  // ** Hook
  const theme = useTheme()

  const handleClickShowPassword = (pass_index) => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleClickShowPassword2 = () => {
    setValues({ ...values, showPassword2: !values.showPassword2 })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleMouseDownPassword2 = event => {
    event.preventDefault()
  }

  const sendData = async (data) => {

    await axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/coaches/create`, {
        password: data.password,
        email: data.email,
        lastName: data.lastName,
        firstName: data.firstName,
        height: data.height,
        weight: data.weight,
        gender: data.gender,
        birthDate: data.birthDate,
        cv: data.cv,
        certificates: data.certificates
      })
      .then(response => {
        
        setOpenSpinner(false)
        router.push('/pages/login/')
        console.log(response)
      })
      .catch(err => {
        // TODO: error handling Important 
        console.log(err)
      })

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

                    {
                      polygonStyle.map((style) => (
                        <polygon
                          id={style.id}
                          opacity={style.opacity}
                          fill={theme.palette.common.black}
                          points={style.points}
                          transform={style.transform}
                        />
                      ))
                    }

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
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            {
              inputFields.map((input_field) => (
                <>
                  <label>{input_field.bigLabel ? input_field.bigLabel : ""}</label>
                  <TextField
                    fullWidth={input_field.fullWidth}
                    type={input_field.type}
                    id={input_field.id}
                    placeholder={input_field.placeholder}
                    sx={input_field.sx}
                    label={input_field.label}
                    {...register(input_field.id, input_field.registerOptions)}
                    inputProps={input_field.inputProps ? input_field.inputProps : ""}
                  />
                </>
              ))
            }
            <FormControl fullWidth>
              <InputLabel id='form-layouts-separator-select-label'>Gender</InputLabel>
              <Select
                label='Country'
                defaultValue=''
                id='form-layouts-separator-select'
                labelId='form-layouts-separator-select-label'
                {...register('gender', {
                  required: true
                })}
                sx={{ marginBottom: 4 }}
              >
                <MenuItem value='F'>Female</MenuItem>
                <MenuItem value='M'>Male</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 4 }}>
              <label>Password</label>
              <OutlinedInput
                id='auth-register-password'
                type={values.showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: true,
                  min: 5,
                  max: 16
                })}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 4 }}>
              <label>Password confiramtion</label>
              <OutlinedInput
                id='Password2'
                type={values.showPassword2 ? 'text' : 'password'}

                {...register('cpassword', {
                  required: true,
                  validate: (val) => {
                    if (watch('password') != val) {
                      return "Password does not much";
                    }
                  }
                })}

                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword2}
                      onMouseDown={handleMouseDownPassword2}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword2 ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <p id='confirmation' value={values.confirmation}></p>
            </FormControl>
            {/* Dialog to accept data submission */}

            <div>
           
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Form confirmation ?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Please click one more time to SignUP button to validate the informations
                    Disclaimer: Please be patient after submitting the form the automatic treatement will take some time 
                    **Your demand will be treated after redirection you can use the platform as an athlete** 
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Disagree</Button>
                  <Button onClick={handleClose} autoFocus>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
            </div>


            {/*  */}


            <FormControlLabel
              control={<Checkbox />}
              label={
                <Fragment>
                  <span>I agree to </span>
                  <Link href='/' passHref>
                    <LinkStyled onClick={e => e.preventDefault()}>privacy policy & terms</LinkStyled>
                  </Link>
                </Fragment>
              }
            />

            {
              openSpinner ? 
              <CircularIndeterminate /> 
              : 
              <Button
                fullWidth
                size='large'
                variant='contained'
                sx={{ marginBottom: 7 }}
                type='submit'
              >
                Sign up
              </Button>
            }
            
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                Already have an account?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/pages/login'>
                  <LinkStyled>Sign in instead</LinkStyled>
                </Link>
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}
RegisterPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default RegisterPage
