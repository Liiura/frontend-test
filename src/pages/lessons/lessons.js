import React, { useState, useEffect } from 'react';
import Service from '../../services/service'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme)=>({
  table: {
      minWidth: 650,
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));
const Lessons=(props)=> {
  const[rows,setRows]=useState([])
  const classes = useStyles();
  useEffect(()=>{
    asyncRequest()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const asyncRequest=async ()=>{
    try {
        const payload=await Service(`student/GetInformationClass/${props.history.location.state}`,'get')
        setRows(payload.data.Data)
    } catch (err) {
        alert(err)
    }
  }
  return (
    <div className='lessons'>
              <div className="tableInformation">
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Estudiante</TableCell>
                            <TableCell align="right">Clase</TableCell>
                            <TableCell align="right">Mentor</TableCell>
                            <TableCell align="right">Carrera</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.nombreEstudiante}>
                        <TableCell align="right">{row.nombreEstudiante}</TableCell>
                        <TableCell align="right">{row.nombreclase}</TableCell>
                        <TableCell align="right">{row.nombreMentor}</TableCell>
                        <TableCell align="right">{row.nombrecarrera}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
        </TableContainer>
        </div>
    </div>
  );
}

export default Lessons;