import dynamic from 'next/dynamic'

import { Button, Card, Divider, Grid, InputLabel, Stack, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { styled } from '@mui/material/styles';

import { useForm } from 'react-hook-form'

import Paper from '@mui/material/Paper';

import AlarmIcon from '@mui/icons-material/Alarm';
import DeleteIcon from '@mui/icons-material/Delete';

import { getSession } from 'next-auth/react';
import { createSession } from 'src/handlers/fetchers/ProgramGroupFetchers';


import useSWRMutation from 'swr/mutation'
import FullScreenDialog from 'src/views/sessions/SessionCard';




const StepUI = dynamic(() => import('src/views/programs/StepUI'), {
    loading: () => 'Loading ... '
})

const StepForm = dynamic(() => import('src/views/sessions/stepForm'), {
    loading: () => 'Loading ... '
})


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

    const program_id = context.params.program_id;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sessions/groups/${program_id}`)
    const body = await res.json();

    return {
        props: {
            sessions_sp: body,
            session: session
        }
    }
}



const SessionsPage = (props) => {

    const { register, formState: { errors }, handleSubmit, reset } = useForm();


    const router = useRouter();
    const { program_id } = router.query

    const [openStepCreation, setOpenStepCreation] = useState(false);


    const [newSession, setNewSession] = useState(null);

    useEffect(() => {
        console.log(props.sessions_sp)
    })

    const handleOpenStepCreation = () => {
        setOpenStepCreation(true)
    }

    const handleCloseStepCreation = () => {
        setOpenStepCreation(false)
    }

    const onSubmit = async (data) => {
        // console.log(newSteps)

        /**
         * session creation object object : 
         * 
         * {
         *  group_id: 1, 
         *  title: ".....", 
         *  steps: [
         *      {
         *          color: "....",
         *          type: "....", 
         *          duration: "....", 
         *          repitition: "...."
         *      },
         *      {
         *          color: "....",
         *          type: "....", 
         *          duration: "....", 
         *          repitition: "...."
         *      },
         *      {
         *          color: "....",
         *          type: "....", 
         *          duration: "....", 
         *          repitition: "...."
         *      },
         *      {
         *          color: "....",
         *          type: "....", 
         *          duration: "....", 
         *          repitition: "...."
         *      }
         *  ]
         * 
         * }
         */

        const sessionObject = {
            group_id: parseInt(program_id),
            title: data.session_title,
            steps: newSteps
        }


        console.log(sessionObject)


        try {
            trigger(sessionObject)
            router.push("/programs")
        } catch (err) {
            console.log(err)
        }


    }

    // when adding new steps we can manage here the added steps 
    const [newSteps, setNewSteps] = useState([])

    const {
        trigger,
        isMutating
    } = useSWRMutation('/sessions/create', createSession)



    // dialog sessions 
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div>
                Program : {program_id} , see all sessions 
                <Button variant="outlined" onClick={handleClickOpen}>
                    Open to see sessions 
                </Button>
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
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <InputLabel id="session-title">Session title</InputLabel>
                            <TextField
                                {...register("session_title", { required: true })}
                                aria-invalid={errors.session_title ? "true" : "false"}
                                id="outlined-error"
                                item xs={3}
                            />
                            {errors.session_title?.type === 'required' && <Typography color={'red'}>Session title is required</Typography>}

                            {
                                (newSteps.length === 0) ? <></> : (
                                    <Button
                                        disabled={isMutating}
                                        variant='contained'
                                        size='small'
                                        color='success'
                                        type='submit'

                                    >
                                        {isMutating ? 'Saving ...' : 'Save session'}
                                    </Button>
                                )
                            }
                        </form>
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

                <FullScreenDialog
                    sessions={props.sessions_sp}
                    open={open}
                    handleClickOpen={handleClickOpen}
                    handleClose={handleClose}
                />

            </Grid>
        </>
    )
}

export default SessionsPage