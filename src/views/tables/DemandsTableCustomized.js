// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import { styled } from '@mui/material/styles'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { Button, IconButton, Link } from '@mui/material'

import { Box } from '@mui/system'

import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';

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

const demands_data = [
  {
    "coach_name": "Mohamed ahrrass",
    "cv": "url",
    "demand_number": "1"
  },
  {
    "coach_name": "John Doe",
    "cv": "url2",
    "demand_number": "2"
  },
  {
    "coach_name": "Karlin herera",
    "cv": "url3",
    "demand_number": "3"
  },
  {
    "coach_name": "Justin depal",
    "cv": "url4",
    "demand_number": "4"
  },
  {
    "coach_name": "Justina martinez",
    "cv": "url5",
    "demand_number": "5"
  }
]

const DemandsTableCustomized = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Coach name</StyledTableCell>
            <StyledTableCell align='right'>Curriculum Vitae</StyledTableCell>
            <StyledTableCell align='right'>Demand number</StyledTableCell>
            <StyledTableCell align='right'>Details</StyledTableCell>
            <StyledTableCell align='right'>Accept</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {demands_data.map(row => (
            <StyledTableRow key={row.coach_name}>
              <StyledTableCell component='th' scope='row'>
                {row.coach_name}
              </StyledTableCell>
              <StyledTableCell align='right'>{row.cv}</StyledTableCell>
              <StyledTableCell align='right'>{row.demand_number}</StyledTableCell>
              <StyledTableCell align='right'>
                <Link href="#">see details</Link>
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

              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DemandsTableCustomized
