
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
        <StyledTableRow key={props.row.id}>
            <StyledTableCell align='center'>
                <Avatar src={`https://avatars.dicebear.com/api/male/${props.row.coachPending.id}.svg`} />
            </StyledTableCell>
            <StyledTableCell align='center'>
                {props.row.coachPending.firstName + " " + props.row.coachPending.lastName}
            </StyledTableCell>
            <StyledTableCell align='center'>
                <Link href={props.row.cvUrl} color="inherit">
                    Link
                </Link>
            </StyledTableCell>
            <StyledTableCell align='center'>{props.row.coachPending.email}</StyledTableCell>
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
                                            id={props.row.coachPending.id}

                                            // image={row.demand.user.image}
                                            firstName={props.row.coachPending.firstName}
                                            lastName={props.row.coachPending.lastName}
                                            email={props.row.coachPending.email}
                                            weight={props.row.coachPending.weight}
                                            height={props.row.coachPending.height}

                                            // role={row.demand.roles[0].name}
                                            gender={(props.row.coachPending.gender == 'M' || props.row.coachPending.gender == 'm') ? 'Male' : 'Female'}
                                    
                                            certificates = {props.row.certificates}
                                            cv={props.row.cvUrl}
                                            type={props.row.type}
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