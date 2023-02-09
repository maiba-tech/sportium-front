
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'
import { Alert, Avatar, Box, Button, Card, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Link, Snackbar, TextField } from '@mui/material'

import TableCell, { tableCellClasses } from '@mui/material/TableCell'


import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useRef, useState } from 'react'
import TabDemand from './TabDemandCoach'
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
  const router = useRouter();

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
   // if (url) {
      router.push("/");

   // }
  };

  const handleClose = () => {

    setOpen(false);
  };

  const handleDemand = () => {
    setUpdateDemand(true)


    updateDemandState();
    setUpdateDemand(true)
    setOpen(false);

    window.location.reload()

  };

  useEffect(() => {
    if (isActionFirstRender.current) {
      isActionFirstRender.current = false;

      return
    }
    handleDemand()
  }, [demandAction])


  const updateDemandState = async () => {
   // console.log({ "demand acrioj": demandAction })
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
        {props.row.name}
      </StyledTableCell>
      <StyledTableCell align='center'>
        {props.row.bio}
      </StyledTableCell>
      <StyledTableCell align='center'>{props.row.creationDate}</StyledTableCell>
      <StyledTableCell align='center'>
        <Button variant='contained' color='success' onClick={() => handleClickOpen()}>
          Sessions
        </Button>
      </StyledTableCell>
    </StyledTableRow>
  )
}

export default SingleTableDialog;
