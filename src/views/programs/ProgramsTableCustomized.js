// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import { styled } from '@mui/material/styles'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { Link } from '@mui/material'
import { useEffect } from 'react'



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

const TableFields = ["Num", "Program name", "Categorie", "Athletes count", "Add session"]

const ProgramsTableCustomized = (props) => {

  useEffect(() => {
    console.log(props.programs)
  })


  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              {TableFields.map((cell, index) => (
                <StyledTableCell key={index} align='center'>{cell}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.programs.map((row, index) => (
              <StyledTableRow key={row.program_name}>
                {/* <StyledTableCell component='th' scope='row'>
                  {row.name}
                </StyledTableCell> */}
                <StyledTableCell align='center'>{index + 1}</StyledTableCell>
                <StyledTableCell align='center'>{row.name}</StyledTableCell>
                <StyledTableCell align='center'>{row.category}</StyledTableCell>
                <StyledTableCell align='center'>{row.athletes_count}</StyledTableCell>
                <StyledTableCell align='center'>
                  <Link href={`${row.id}`} underline = 'always'>
                    go
                  </Link>

                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default ProgramsTableCustomized
