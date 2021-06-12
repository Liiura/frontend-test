import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import './students.css'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Service from '../../services/service'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
const useStyles = makeStyles((theme)=>({
    root: {
        marginBottom: '20px',
        width:'80%'
    },
    btnsubmit: {
      marginTop:'15px',
      textAlign:'center'
    },
    lastField:{
        width:'80%'
    },
    table: {
        minWidth: 650,
      },
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    
  }));
const Students=()=> {
    useEffect(()  => {
        getDataRows()
    },[])
    const classes = useStyles();
    const getDataRows=async ()=>{
        try {
            const payload=await Service("student/GetAllStudents",'get')
            setRows(payload.data.Data)
        } catch (error) {
            
        }
    }
    const handleOpen = (idStudentsParam,nameParam,lastNameParam,ageParam,emailParam) => {
        setDataUpdate({...data,idStudent:idStudentsParam,name:nameParam,lastName:lastNameParam,age:ageParam,email:emailParam })
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
      const handleInformation=(event)=>{
        setData({...data,[event.target.name]:event.target.value})
    }
    const handleInformationUpdate=(event)=>{
        setDataUpdate({...dataUpdate,[event.target.name]:event.target.value})
    }
    const Update=async (e) =>{
        e.preventDefault()
        try {
            const payload=await Service('student/UpdateStudent','put',dataUpdate)
            toast.success(payload.data.Message);
            setDataUpdate({...data,idStudent:"",name:"",lastName:"",age:"",email:""})
            getDataRows()
            handleClose()
        } catch (err) {
            alert(err)
        }
    }
    const submit= async (e)=>{
      e.preventDefault()
        try {
            const careersVector=['matematicas','español']
            const rndInt = Math.floor(Math.random() * 2) + 1
            const careerchoose=careersVector[rndInt-1]
            const dataSend={
                idStudent:data.idStudent,
                name:data.name,
                lastName:data.lastName,
                age:data.age,
                email:data.email,
                careername:careerchoose
            }
            const payload=await Service('student/InsertStudent','post',dataSend)
            toast.success(payload.data.Message);
            setData({...data,idStudent:"",name:"",lastName:"",age:"",email:""})
            getDataRows()
        } catch (err) {
            alert(err)
        }
    }
    const [rows,setRows]=useState([])
    const [data,setData]=useState({
        idStudent:"",
        name:"",
        lastName:"",
        age:"",
        email:"",
        careername:""
      })
      const [dataUpdate,setDataUpdate]=useState({
        idStudent:"",
        name:"",
        lastName:"",
        age:"",
        email:""
      })
      const [open, setOpen] = React.useState(false);
  return (
    <div className='students'>
        <div className="formcard">
            <h1 className="tittle">Registro de estudiante</h1>
            <TextField classes={{root: classes.root}} label="Identificación" variant="filled" name="idStudent" onChange={(e)=>handleInformation(e)} value={data.idStudent}/>
            <TextField classes={{root: classes.root}} label="Nombre" variant="filled" name="name" onChange={(e)=>handleInformation(e)} type="text" value={data.name}/>
            <TextField classes={{root: classes.root}} label="Apellido" variant="filled" name="lastName" onChange={(e)=>handleInformation(e)} value={data.lastName}/>
            <TextField classes={{root: classes.root}} label="Edad" variant="filled" name="age" onChange={(e)=>handleInformation(e)} type="number" value={data.age}/>
            <TextField  label="Correo" variant="filled" classes={{root: classes.lastField}} name="email" onChange={(e)=>handleInformation(e)} type="text" value={data.email}/>
            <Button variant="contained" color="primary" classes={{root: classes.btnsubmit}} onClick={(e)=>submit(e)}>Registrar</Button>
        </div>
        <div className="tableInformation">
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Nombre</TableCell>
                            <TableCell align="right">Apellido</TableCell>
                            <TableCell align="right">Edad</TableCell>
                            <TableCell align="right">Correo</TableCell>
                            <TableCell align="right">Editar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.Correo}>
                        <TableCell align="right">{row.Nombre}</TableCell>
                        <TableCell align="right">{row.Apellido}</TableCell>
                        <TableCell align="right">{row.Edad}</TableCell>
                        <TableCell align="right">{row.Correo}</TableCell>
                        <TableCell align="right"><Button variant="contained" onClick={()=>handleOpen(row.idestudiante,row.Nombre,row.Apellido,row.Edad,row.Correo)} >Editar</Button></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
        </TableContainer>
        </div>
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className="formcardEdit">
                <h1 className="tittle">Editar estudiante</h1>
                <TextField classes={{root: classes.root}} label="Identificación" variant="filled" name="idStudent" onChange={(e)=>handleInformationUpdate(e)} value={dataUpdate.idStudent}/>
                <TextField classes={{root: classes.root}} label="Nombre" variant="filled" name="name" onChange={(e)=>handleInformationUpdate(e)} type="text" value={dataUpdate.name}/>
                <TextField classes={{root: classes.root}} label="Apellido" variant="filled" name="lastName" onChange={(e)=>handleInformationUpdate(e)} value={dataUpdate.lastName}/>
                <TextField classes={{root: classes.root}} label="Edad" variant="filled" name="age" onChange={(e)=>handleInformationUpdate(e)} type="number" value={dataUpdate.age}/>
                <TextField  label="Correo" variant="filled" classes={{root: classes.lastField}} name="email" onChange={(e)=>handleInformationUpdate(e)} type="text" value={dataUpdate.email}/>
                <Button variant="contained" color="primary" classes={{root: classes.btnsubmit}} onClick={(e)=>Update(e)}>Actualizar</Button>
            </div>
          </div>
        </Fade>
        </Modal>
        <ToastContainer />
    </div>
  );
}

export default Students;