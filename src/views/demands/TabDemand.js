// ** React Imports
import React, { useEffect, useState } from 'react'

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
import { Divider, List, ListItem, ListItemButton, ListItemText, ListSubheader } from '@mui/material'

const ImgStyled = styled('img')(({ theme }) => ({
    width: 120,
    height: 120,
    marginRight: theme.spacing(6.25),
    borderRadius: theme.shape.borderRadius
}))




const TabDemand = props => {

    const [image, setImage] = useState(`https://avatars.dicebear.com/api/male/${props.id}.svg`);

    return (
        <CardContent>
            <Grid container spacing={7}>
                <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ImgStyled src={image} alt='Profile Pic' />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Coach personal data
                            </ListSubheader>
                        }
                    >
                        <Divider variant="inset" component="li" />
                        <ListItem>
                            <ListItemText primary="First name" secondary={props.firstName} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Last name" secondary={props.lastName} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Email" secondary={props.email} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Weight" secondary={props.weight} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Height" secondary={props.height} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Gender" secondary={props.gender} />
                        </ListItem>
                    </List>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Coach Submited attachments
                            </ListSubheader>
                        }
                    >
                        <Divider variant="inset" component="li" />
                        <ListItem>
                            <ListItemText
                                primary="Curriculum Vitae"
                                secondary={
                                    <React.Fragment>
                                        <Link target={"_blank"} href={props.cv} underline="always">
                                            see cv
                                        </Link>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <ListItem>
                            <List
                                sx={{
                                    width: '100%',
                                    maxWidth: 360,
                                    bgcolor: 'background.paper',
                                    position: 'relative',
                                    overflow: 'auto',
                                    maxHeight: 300,
                                    '& ul': { padding: 0 },
                                }}
                                subheader={<li />}
                            >
                                <ListSubheader>{`Certificates`}</ListSubheader>
                                {props.certificates.map((certificate) => (
                                    <li key={`section-${1}`}>
                                        <ul>
                                            <ListItem key={`item-${1}-${1}`}>
                                                <ListItemText
                                                    secondary={
                                                        <React.Fragment>
                                                            <Link target={"_blank"} href={certificate.url} underline="always">
                                                                see certificate
                                                            </Link>
                                                        </React.Fragment>
                                                    }
                                                />
                                            </ListItem>
                                        </ul>
                                    </li>
                                ))}
                            </List>
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Demand Type"
                                secondary={props.type}
                            />
                        </ListItem>
                    </List>
                </Grid>


            </Grid>
        </CardContent>
    )
}

export default TabDemand
