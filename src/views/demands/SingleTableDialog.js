
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'
import { Avatar, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Link, TextField } from '@mui/material'

import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { Box } from '@mui/system'

import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react'
import { TabContext, TabPanel } from '@mui/lab'
import TabDemand from '../demands/TabDemand'


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.common.black
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    }
}))


const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
    },

    // hide last border
    '&:last-of-type td, &:last-of-type th': {
        border: 0
    }
}))

const SingleTableDialog = (props) => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    return (
        <StyledTableRow key={props.row.demand.demand_id}>
            <StyledTableCell align='center'>
                <Avatar src={`https://avatars.dicebear.com/api/male/${props.row.demand.coach_pending.id}.svg`} />
            </StyledTableCell>
            <StyledTableCell align='center'>
                {props.row.demand.coach_pending.firstName + " " + props.row.demand.coach_pending.lastName}
            </StyledTableCell>
            <StyledTableCell align='center'>{props.row.demand.documents.cv}</StyledTableCell>
            <StyledTableCell align='center'>{props.row.demand.coach_pending.email}</StyledTableCell>
            <StyledTableCell align='center'>
                <Button variant='contained' color='warning' onClick={() => handleClickOpen()}>
                    Details
                </Button>
            </StyledTableCell>
            <StyledTableCell align='right'>
                <Box sx={{ '& button': { m: 1 } }}>
                    <div>
                        <IconButton color="success" aria-label="accept demand" component="label">
                            <DoneIcon />
                        </IconButton>
                        <IconButton color="error" aria-label="deny demand" component="label">
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </Box>
                <div>
                    <Dialog maxWidth="lg" open={open} onClose={() => handleClose()}>
                        <DialogTitle>Demand details</DialogTitle>
                        <DialogContent>
                            <Card>
                                <TabContext value='demand'>
                                    <TabPanel sx={{ p: 0 }} value='demand'>
                                        <TabDemand
                                            id={props.row.demand.coach_pending.id}
                                            // image={row.demand.user.image}
                                            firstName={props.row.demand.coach_pending.firstName}
                                            lastName={props.row.demand.coach_pending.lastName}
                                            email={props.row.demand.coach_pending.email}
                                            weight={props.row.demand.coach_pending.weight}
                                            height={props.row.demand.coach_pending.height}
                                            // role={row.demand.roles[0].name}
                                            gender={(props.row.demand.coach_pending.gender == 'M' || props.row.demand.coach_pending.gender == 'm') ? 'Male' : 'Female'}
                                            documents={props.row.demand.documents}
                                            state={props.row.demand.state}
                                        />
                                    </TabPanel>
                                </TabContext>
                            </Card>
                        </DialogContent>
                        <DialogActions>
                            <Button color="error" startIcon={<DeleteIcon />} onClick={() => handleClose()}>Deny</Button>
                            <Button color="success" startIcon={<DoneIcon />} onClick={() => handleClose()}>Accept</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </StyledTableCell>
        </StyledTableRow>
    )
}

export default SingleTableDialog; 