
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'
import { Alert, Avatar, Box, Button, Card, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Link, Snackbar, TextField } from '@mui/material'

import TableCell, { tableCellClasses } from '@mui/material/TableCell'


import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useRef, useState } from 'react'
import TabDemand from '../demands/TabDemand'
import axios from 'axios'
import { Router, useRouter } from 'next/router'


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

    /**States */
    const [open, setOpen] = useState(false);
    const [updateDemand, setUpdateDemand] = useState(false)
    

    const [messageSnack, setMessageSnack] = useState({
        message: "",
        severity: ""
    })

    const isActionFirstRender = useRef(true)

    const [openSnackBar, setOpenSnackBar] = useState(false);


    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackBar(false);
    };

    // could take accept or deny 
    const [demandAction, setDemandAction] = useState("");

    /**Handlers */
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {

        setOpen(false);
    };

    const handleDemand = () => {
        setUpdateDemand(true)


        updateDemandState();
        setUpdateDemand(true)
        setOpen(false);

        props.router.reload(window.location.pathname)

    };

    useEffect(() => {
        if (isActionFirstRender.current) {
            isActionFirstRender.current = false;

            return
        }
        handleDemand()
    }, [demandAction])


    const updateDemandState = async () => {
        console.log({ "demand acrioj": demandAction })
        if (demandAction.trim(' ').length !== 0) {
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/request/Admin/${props.row.id}/${demandAction}`)
                .then(res => {
                    res.status === 200 ? setMessageSnack({ message: "Demand updated succefully", severity: "success" }) : setMessageSnack({ message: "Unkown error occured", severity: "warning" })
                    setOpenSnackBar(true)
                })
                .catch(err => {
                    setMessageSnack({ message: "Server error ", severity: "error" })
                    setOpenSnackBar(true)
                })

        }

    }

    return (
        <StyledTableRow key={props.row.id}>
            <StyledTableCell align='center'>
                <Avatar src={`https://avatars.dicebear.com/api/male/${props.row.coachPending.id}.svg`} />
            </StyledTableCell>
            <StyledTableCell align='center'>
                {props.row.coachPending.firstName + " " + props.row.coachPending.lastName}
            </StyledTableCell>
            <StyledTableCell align='center'>
                {props.row.requestStateUpdates[0].stateName}
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

                        <Alert severity='warning'>Open details</Alert>
                    </div>
                </Box>
                <div>
                    <Dialog maxWidth="lg" open={open} onClose={() => handleClose()}>
                        <DialogTitle>Demand details</DialogTitle>
                        <DialogContent>
                            <Card>

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
                                    state={props.row.requestStateUpdates.stateName}
                                    certificates={props.row.certificates}
                                    cv={props.row.cvUrl}
                                    type={props.row.type}
                                />

                            </Card>
                        </DialogContent>

                        <DialogActions>
                            {updateDemand === false ?
                                (
                                    <>
                                        <Button
                                            color="error"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => {
                                                setDemandAction("deny")
                                            }}>
                                            Deny
                                        </Button>
                                        <Button
                                            color="success"
                                            startIcon={<DoneIcon />}
                                            onClick={() => {
                                                setDemandAction("accept")
                                            }}
                                        >
                                            Accept
                                        </Button>
                                    </>
                                )
                                :
                                (
                                    <Box sx={{ display: 'flex' }}>
                                        <CircularProgress />
                                    </Box>
                                )}

                        </DialogActions>
                    </Dialog>
                </div>
            </StyledTableCell>
            <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleSnackBarClose}>
                <Alert variant="filled" onClose={handleSnackBarClose} severity={messageSnack.severity} sx={{ width: '100%' }}>
                    {messageSnack.message}
                </Alert>
            </Snackbar>
        </StyledTableRow>
    )
}

export default SingleTableDialog; 