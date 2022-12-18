import { Card, CardHeader, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DemandsTableCustomized from 'src/views/tables/DemandsTableCustomized'



const demands_test = [
    {
        "demand": {
            "demand_id": "ac241c1b-f0a5-43b7-8fde-f05730f87a64",
            "coach_pending": {
                "id": "7e3c3c73-0e0d-4102-a0e8-bcbef3c1befd",
                "firstName": "Mohamed",
                "lastName": "AHRRASS",
                "email": "asdf@fasca.com",
                "birthDate": "2000-15-04",
                "gender": "male",
                "weight": "76",
                "height": "1.65"
            },
            "documents": {
                "cv": "https://res.cloundinary.com/...",
                "certificates": ["url1", "url2"]
            },
            "state": "PENDING"

        }
    },
    {
        "demand": {
            "demand_id": "4359c3db-1d42-4481-9848-1048a8aa3733",
            "coach_pending": {
                "id": "078d08a2-7196-4ea3-9fd2-0db6314772ad",
                "firstName": "John",
                "lastName": "DOE",
                "email": "asdf@fasca.com",
                "birthDate": "2000-15-04",
                "gender": "male",
                "weight": "76",
                "height": "1.65"
            },
            "documents": {
                "cv": "https://res.cloundinary.com/...",
                "certificates": ["url1", "url2"]
            },
            "state": "PENDING"

        }
    },
    {
        "demand": {
            "demand_id": "3b89fbc6-111f-46d1-a51e-ff4ef313459b",
            "coach_pending": {
                "id": "9711414b-474f-48f8-b2e2-6fb4c97d4e3a",
                "firstName": "jIJNO",
                "lastName": "AHRRASS",
                "email": "asdf@fasca.com",
                "birthDate": "2000-15-04",
                "gender": "male",
                "weight": "76",
                "height": "1.65"
            },
            "documents": {
                "cv": "https://res.cloundinary.com/...",
                "certificates": ["url1", "url2"]
            },
            "state": "PENDING"

        }
    },
    {
        "demand": {
            "demand_id": "28728058-2f9d-444a-8224-25b131fc835b",
            "coach_pending": {
                "id": "1f6019cd-05a2-4d6e-a86c-3ea7e72e4447",
                "firstName": "Mathiu",
                "lastName": "ADTQ",
                "email": "asdf@fasca.com",
                "birthDate": "2000-15-04",
                "gender": "male",
                "weight": "76",
                "height": "1.65"
            },
            "documents": {
                "cv": "https://res.cloundinary.com/...",
                "certificates": ["url1", "url2", "url2", "url2", "url2", "url2", "url2"]
            },
            "state": "PENDING"

        }
    },
]


const DemandPage = () => {

    // the demands fetch will be launched here 



    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Typography variant='h5'>
                    <h1>Demands table</h1>
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Demands Table' titleTypographyProps={{ variant: 'h6' }} />
                    <DemandsTableCustomized demands={demands_test}/>
                </Card>
            </Grid>
        </Grid>
    )
}

export default DemandPage