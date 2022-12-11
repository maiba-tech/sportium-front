import { Card, CardHeader, Grid, Typography } from '@mui/material'
import React from 'react'
import DemandsTableCustomized from 'src/views/tables/DemandsTableCustomized'




const DemandPage = () => {
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
                    <DemandsTableCustomized />
                </Card>
            </Grid>
        </Grid>
    )
}

export default DemandPage