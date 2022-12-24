import { Alert, Card, CardHeader, Grid, Typography } from '@mui/material'
import { getSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import DemandsTableCustomized from 'src/views/tables/DemandsTableCustomized'



const demands_test = [
    {
        "id": "c4fed15f-5598-4618-91dd-6278fd335d08",
        "coachPending": {
            "id": "1cfd50e2-d4d5-439a-baa6-9f8d57439ba4",
            "firstName": "Mohamed",
            "lastName": "AHRRASS",
            "email": "hunter@adfa.com",
            "birthDate": "1997-06-14",
            "gender": "M",
            "weight": 76.0,
            "height": 1.76
        },
        "type": "Upgrade to Coach",
        "requestStateUpdates": [
            {
                "id": "b786f336-f428-418f-9db2-539e9e5a50ad",
                "stateUpdatedOn": "2022-12-23T15:12:10.377116",
                "stateName": "Pending"
            }
        ],
        "certificates": [
            {
                "url": "https://res.cloudinary.com/detynqplm/image/upload/v1671804813/sportium/documents/certificate/CERTIFICATE_f6487181-5da4-4612-b3f2-cffa66db7667.pdf"
            }
        ],
        "cvUrl": "https://res.cloudinary.com/detynqplm/image/upload/v1671804803/sportium/documents/cv/CV_6b92e2ca-7b50-4ce0-957a-9bcb3f9dc596.pdf"
    },
    {
        "id": "c4fed15f-5598-4618-91dd-6278fd335d08",
        "coachPending": {
            "id": "1cfd50e2-d4d5-439a-baa6-9f8d57439ba4",
            "firstName": "Mohamed",
            "lastName": "AHRRASS",
            "email": "hunter@adfa.com",
            "birthDate": "1997-06-14",
            "gender": "M",
            "weight": 76.0,
            "height": 1.76
        },
        "type": "Upgrade to Coach",
        "requestStateUpdates": [
            {
                "id": "b786f336-f428-418f-9db2-539e9e5a50ad",
                "stateUpdatedOn": "2022-12-23T15:12:10.377116",
                "stateName": "Pending"
            }
        ],
        "certificates": [
            {
                "url": "https://res.cloudinary.com/detynqplm/image/upload/v1671804813/sportium/documents/certificate/CERTIFICATE_f6487181-5da4-4612-b3f2-cffa66db7667.pdf"
            }
        ],
        "cvUrl": "https://res.cloudinary.com/detynqplm/image/upload/v1671804803/sportium/documents/cv/CV_6b92e2ca-7b50-4ce0-957a-9bcb3f9dc596.pdf"
    },
    {
        "id": "c4fed15f-5598-4618-91dd-6278fd335d08",
        "coachPending": {
            "id": "1cfd50e2-d4d5-439a-baa6-9f8d57439ba4",
            "firstName": "Mohamed",
            "lastName": "AHRRASS",
            "email": "hunter@adfa.com",
            "birthDate": "1997-06-14",
            "gender": "M",
            "weight": 76.0,
            "height": 1.76
        },
        "type": "Upgrade to Coach",
        "requestStateUpdates": [
            {
                "id": "b786f336-f428-418f-9db2-539e9e5a50ad",
                "stateUpdatedOn": "2022-12-23T15:12:10.377116",
                "stateName": "Pending"
            }
        ],
        "certificates": [
            {
                "url": "https://res.cloudinary.com/detynqplm/image/upload/v1671804813/sportium/documents/certificate/CERTIFICATE_f6487181-5da4-4612-b3f2-cffa66db7667.pdf"
            }
        ],
        "cvUrl": "https://res.cloudinary.com/detynqplm/image/upload/v1671804803/sportium/documents/cv/CV_6b92e2ca-7b50-4ce0-957a-9bcb3f9dc596.pdf"
    },
]

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

    // fetch all pending demands 
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/request/Admin/pending`)
    const body = await res.json()
    if (res.status === 200) {
        return {
            props: {
                data: body,
                session: session
            }
        }
    } else {
        return {
            props: {
                error: body
            }
        }
    }
}


const DemandPage = (props) => {


    if(props.error)
    {
        return (
            <Alert severity="error">Error while getting data</Alert>
        )
    }

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Typography variant='h5'>
                    <h1>Demands table</h1>
                </Typography>
            </Grid>
            <Grid item xs={12}>
                {
                    props.data.length > 0 ?
                        (
                            <Card>
                                <CardHeader title='Demands Table' titleTypographyProps={{ variant: 'h6' }} />
                                <DemandsTableCustomized demands={props.data} />
                            </Card>) :
                        (
                            <Alert severity="warning">There is no demands to show</Alert>
                        )
                }

            </Grid>
        </Grid>
    )
}

export default DemandPage