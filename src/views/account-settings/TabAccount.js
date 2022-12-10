// ** React Imports
import { useEffect, useState } from 'react'

import { getSession, useSession } from 'next-auth/react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import axios from 'axios'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccount = props => {
  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  }

  const handleChange = prop => event => {
    if(prop=="height"|| prop=="weight"){
      setValues({ ...values, [prop]: parseFloat(event.target.value) })
      return;
    }
    setValues({ ...values, [prop]: event.target.value })
  }
  let id;

  useEffect(()=>{
    id=props.id;
  });

  const [values,setValues]=useState({
    firstName:props.firstName,
    lastName:props.lastName,
    height:parseFloat(props.height),
    weight:parseFloat(props.weight)
  });

  const sendData=()=>{
    console.log(values)
    axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/athletes/update/${id}`,
      {
        firstName:values.firstName,
        lastName:values.lastName,
        height:values.height,
        weight:values.weight
      })
      .then(response=> {
          console.log(response)
        })
      .catch(err=>{
        console.log(err)
      });
  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={props.image} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                  Reset
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField fullWidth label='First name' placeholder='johnDoe' value={values.firstName}
                       onChange={handleChange('firstName')}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField fullWidth label='Last name' placeholder='johnDoe' defaultValue={values.lastName}
                       onChange={handleChange('lastName')}/>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='email'
              label='Email'
              placeholder='johnDoe@example.com'
              defaultValue={props.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth type='number' label='weight' value={values.weight}
            onChange={handleChange('weight')}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth type='number' label='height' defaultValue={props.height}
                       onChange={handleChange('height')}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth type='text' label='role' defaultValue={props.role} disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth type='text' label='gender' defaultValue={props.gender} disabled/>
          </Grid>
          <Grid item xs={12}>
            {/* TODO: handle the update operation  */}
            <Button variant='contained' sx={{ marginRight: 3.5 }}
              onClick={e=>{
                e.preventDefault()
                sendData()
              }
            }
            >
              Save Changes
            </Button>

            {/* TODO: handle when the user made updates are canselled  */}
            <Button type='reset' variant='outlined' color='secondary'>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
