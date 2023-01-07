import { Alert, Card, CardHeader, Grid, Typography } from '@mui/material'
import { getSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import DemandsTableCustomized from 'src/views/demands/DemandsTableCustomized'


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
    else if(!session.user.roles.some(e => e.name === 'ADMIN')){
        return {
            redirect: {
                destination: '/',
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