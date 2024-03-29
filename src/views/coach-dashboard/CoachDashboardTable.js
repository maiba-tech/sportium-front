// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import { styled } from '@mui/material/styles'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import SingleTableDialogCoach from "./SingleTableDialogCoach";

//import SingleTableDialog from './SingleTableDialog'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.black
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const TableFields = ["Group Name", "Group Bio", "Creation Date", "Sessions"]

const DemandsTableCustomized = (props) => {

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
            {props.groups.map((row, index) => (
              <SingleTableDialogCoach
                key={index}
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
