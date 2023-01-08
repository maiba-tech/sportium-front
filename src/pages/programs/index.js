

import { Alert, Button, Card, CardHeader, FormControl, Grid, InputLabel, Stack, Typography } from '@mui/material'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import React, { useEffect, useState } from 'react'
import ProgramsTableCustomized from 'src/views/programs/ProgramsTableCustomized'
import ProgramForm from 'src/views/programs/ProgramForm';
import { getAllPrograms } from 'src/handlers/local-storage/LocalStorageApi';
import { getSession } from 'next-auth/react';


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
    else if(!session.user.roles.some(e => e.name === 'COACH')){
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


const categories = [
    'Run',
    'Swim',
    'Cycle'
]


const ProgramsPage = (props) => {

    const [nextCategorie, setNextCategorie] = useState(null);
    const [openProgramCreation, setOpenProgramCreation] = useState(false)

    const [programs, setPrograms] = useState(null);

    useEffect(() => {
        setPrograms(getAllPrograms())
    }, [])

    const handleCategorieChange = (event) => {
        setNextCategorie(event.target.value)
    }


    const handleClickOpenProgramCreation = () => {
        setOpenProgramCreation(true);
    };

    const handleCloseProgramCreation = () => {
        setOpenProgramCreation(false);
    };

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
                            {categories.map((categorie, index) => (
                                <MenuItem key={index} value={categorie}>{categorie}</MenuItem>
                            ))}

                        </Select>
                        <Button
                            size="small"
                            variant="outlined"
                            disabled={nextCategorie === null ? true : false}
                            onClick={handleClickOpenProgramCreation}
                        >
                            add program
                        </Button>
                    </Stack>
                </FormControl>
                {
                    (programs === null || programs?.programs === null) ? <Alert severity="warning">There is no programs, add one</Alert> :
                        (
                            <Card>
                                <CardHeader title='Demands Table' titleTypographyProps={{ variant: 'h6' }} />
                                <ProgramsTableCustomized programs={programs.programs} />
                            </Card>
                        )
                }


            </Grid>

            <ProgramForm
                setPrograms={setPrograms}
                category={nextCategorie}
                openProgramCreation={openProgramCreation}
                handleCloseProgramCreation={handleCloseProgramCreation}
            />

        </Grid>
    )
}


export default ProgramsPage