

import { Button, Card, Divider, Grid, Stack } from '@mui/material';
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import AlarmIcon from '@mui/icons-material/Alarm';
import DeleteIcon from '@mui/icons-material/Delete';
import StepForm from 'src/views/sessions/stepForm';
import { StepUI } from 'src/views/programs/StepUI';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const SessionsPage = () => {

    const router = useRouter();
    const { program_id } = router.query

    const [openStepCreation, setOpenStepCreation] = useState(false);

    const handleOpenStepCreation = () => {
        setOpenStepCreation(true)
    }

    const handleCloseStepCreation = () => {
        setOpenStepCreation(false)
    }

    // when adding new steps we can manage here the added steps 
    const [newSteps, setNewSteps] = useState([])

    // each step needs to have a button for deletion from the steps table 

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
                                disabled={newSteps.legth === 0 ? 'true' : 'false'}
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