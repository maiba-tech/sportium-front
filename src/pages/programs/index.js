import dynamic from 'next/dynamic'

import { Alert, Button, Card, CardHeader, FormControl, Grid, InputLabel, Stack, Typography } from '@mui/material'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import React, { useEffect, useState } from 'react'
import { getAllPrograms } from 'src/handlers/local-storage/LocalStorageApi';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import FullScreenDialog from 'src/views/sessions/SessionCard';


const ProgramsTableCustomized = dynamic(() => import('src/views/programs/ProgramsTableCustomized'), {
    loading: () => 'Loading ... '
})

const ProgramForm = dynamic(() => import('src/views/programs/ProgramForm'), {
    loading: () => 'Loading ... '
})

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

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/`)
    const body = await res.json();


    const USER_ID = session.user?.id
    console.log(USER_ID)

    const programs_data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/groups/coach/${USER_ID}`)
    const body_pr = await programs_data.json();

    return {
        props: {

            data: {
                categories_fet: body,
                programs_fet: body_pr
            },
            session: session
        }
    }
}

const ProgramsPage = (props) => {

    const [nextCategorie, setNextCategorie] = useState(null);
    const [openProgramCreation, setOpenProgramCreation] = useState(false)

    const handleCategorieChange = (event) => {
        setNextCategorie(event.target.value)
    }


    const handleClickOpenProgramCreation = () => {
        setOpenProgramCreation(true);
    };

    const handleCloseProgramCreation = () => {
        setOpenProgramCreation(false);
    };

    const router = useRouter();

   





    return (

        <Grid container spacing={6}>

            <Grid item xs={12}>
                <Typography variant='h5'>
                    <h1>Programs table</h1>
                </Typography>
            </Grid>

            <Grid item xs={12}>

                <FormControl sx={{ m: 5, minWidth: 120 }} size="small">
                    <Stack direction="row" spacing={2}>
                        <InputLabel id="categorie-select-s">Categorie</InputLabel>
                        <Select
                            id='categorie-select'
                            value={nextCategorie}
                            label="Categorie"
                            onChange={handleCategorieChange}
                        >
                            {props.data.categories_fet.map((categorie, index) => (
                                <MenuItem key={index} value={categorie.name}>{categorie.name}</MenuItem>
                            ))}

                        </Select>
                        <Button
                            size="small"
                            variant="outlined"
                            disabled={nextCategorie === null}
                            onClick={handleClickOpenProgramCreation}
                        >
                            add program
                        </Button>
                    </Stack>
                </FormControl>
                {
                    (props.data.programs_fet === null) ? <Alert severity="warning">There is no programs, add one</Alert> :
                        (
                            <Card>
                                <CardHeader title='Programs Table' titleTypographyProps={{ variant: 'h6' }} />
                                <ProgramsTableCustomized programs={props.data.programs_fet} />
                            </Card>
                        )
                }


            </Grid>

            <ProgramForm
                router={router}
                creator={props.session.user?.id}
                category={nextCategorie}
                openProgramCreation={openProgramCreation}
                handleCloseProgramCreation={handleCloseProgramCreation}
            />

            

        </Grid>
    )
}


export default ProgramsPage
