// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import { styled } from '@mui/material/styles'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'

import SingleTableDialog from '../demands/SingleTableDialog'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.black
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const TableFields = ["Avatar", "Coach name", "Curriculum Vitae", "Coach email", "Details", "Accept"]

const DemandsTableCustomized = (props) => {

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              {TableFields.map(cell => (
                <StyledTableCell align='center'>{cell}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.demands.map(row => (
              <SingleTableDialog
                row={row}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default DemandsTableCustomized
