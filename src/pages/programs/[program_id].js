

import { Button, Card, Divider, Grid, Stack } from '@mui/material';
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import AlarmIcon from '@mui/icons-material/Alarm';
import DeleteIcon from '@mui/icons-material/Delete';
import StepForm from 'src/views/sessions/stepForm';
import { StepUI } from 'src/views/programs/StepUI';
import { getSession } from 'next-auth/react';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (!session) {
        return {
            redirect: {
                destination: '/pages/login',
                permanent: false
            }
        }
    }
    else if (!session.user.roles.some(e => e.name === 'COACH')) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }


    return {
        props: {
            session: session
        }
    }
}



const SessionsPage = (props) => {

    const router = useRouter();
    const { program_id } = router.query

    const [openStepCreation, setOpenStepCreation] = useState(false);

    const handleOpenStepCreation = () => {
        setOpenStepCreation(true)
    }

    const handleCloseStepCreation = () => {
        setOpenStepCreation(false)
    }

    const handleNewSession = () => {
        console.log(newSteps)
    }

    // when adding new steps we can manage here the added steps 
    const [newSteps, setNewSteps] = useState([])


    return (
        <>
            <div>
                Program : {program_id} , see all sessions (link)
            </div>
            <Grid container spacing={2} mt={5}>
                <Grid item xs={9}>
                    {
                        newSteps.length === 0 ? <></> : (
                            <Item>
                                <Stack direction={'column'} spacing={2}>
                                    {
                                        newSteps.map((step, index) => (
                                            <StepUI
                                                key={index}
                                                newSteps={newSteps}
                                                setNewSteps={setNewSteps}
                                                index={index}
                                                step={step}
                                            />
                                        ))
                                    }
                                </Stack>
                            </Item>
                        )
                    }

                </Grid>
                <Grid item xs={3}>
                    <Item>
                        {
                            newSteps.length === 0 ? <></> : (
                                <Button
                                    variant='contained'
                                    size='small'
                                    color='success'
                                    onClick={() => handleNewSession()}

                                >
                                    Save session
                                </Button>
                            )
                        }

                        <Divider />

                        <Stack direction={'column'} spacing={1}>
                            <Button
                                variant='contained'
                                size='small'
                                color='secondary'
                                startIcon={<AlarmIcon />}
                                onClick={handleOpenStepCreation}
                            >

                                Add a step
                            </Button>
                            <Button
                                variant='contained'
                                size='small'
                                color='secondary'
                                startIcon={<DeleteIcon />}
                                disabled={newSteps.length === 0 ? true : false}
                            >
                                cancel
                            </Button>
                        </Stack>

                        <StepForm
                            newSteps={newSteps}
                            setNewSteps={setNewSteps}
                            openStepCreation={openStepCreation}
                            handleCloseStepCreation={handleCloseStepCreation}
                        />
                    </Item>
                </Grid>
            </Grid>
        </>
    )
}

export default SessionsPage