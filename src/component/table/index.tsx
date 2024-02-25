import { SxProps, Table, TableBody, TableCell, TableHead, TableRow, styled, tableCellClasses } from "@mui/material"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.root}`]: {
    border: `1px solid ${theme.palette.text.disabled}`,
    textAlign: 'center',
  },
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.text.light,
  },
}))

interface Props {
  header: {
    key: string
    label: string
  }[]
  data: {
    [key: string]: string | number
  }[]
  sx?: SxProps
}

const CustomTable = ({ header, data, sx }: Props) => {
  return (
    <Table sx={sx}>
      <TableHead>
        <TableRow>
          {header.map((value, index) => (
            <StyledTableCell key={index}>{value.label}</StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((value1, index1) => (
          <TableRow key={index1}>
            {header.map((value2, index2) => (
              <StyledTableCell key={index2}>{value1[value2.key]}</StyledTableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default CustomTable