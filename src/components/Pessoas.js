import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { getData, deleteData } from "../services/api";
import InfoIcon from '@mui/icons-material/Info';
import { Link, redirect } from "react-router-dom";
import Button from '@mui/material/Button';



export default function Pessoas(){
    const [rows, setRows] = useState([]);
    const [deleteId, setDeleteId] = useState("");
    const [search, setSearch] = useState("");

    function createData(
        id,
        nome,
        telefone,
        necessidade,
      ) {
        return {id, nome, telefone, necessidade };
      }

    function loadData(){
        getData().then(result=>{
            console.log(result)
            let rowsProv = [];
            for(let i=0;i<result.length;i++){
                let a = result[i].data;
                rowsProv.push(createData(result[i].id, a.nome, a.telefone, a.necessidade))
            }
            setRows(rowsProv)
          })
    }

    function deletePessoa(id){
        console.log(id)
        deleteData(id).then(()=>{
            setDeleteId("")
            loadData()
        })
    }

    useEffect(()=>{
       loadData()
    },[])
      
    return(
        <div style={{width:"100%"}}>
        <div style={{width:"98%", display:"flex", justifyContent:"end", marginBottom:"40px"}}>
            <TextField
            id="outlined-controlled"
            label="Procurar"
            value={search}
            onChange={(event) => {
                setSearch(event.target.value);
            }}></TextField>
        </div>

            <Dialog
            open={deleteId!=""}
            onClose={()=>setDeleteId("")}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Tem certeza que deseja fazer a deleção?"}
            </DialogTitle>
            <DialogActions>
            <Button onClick={()=>setDeleteId("")}>Cancelar</Button>
            <Button onClick={()=>deletePessoa(deleteId)} autoFocus>
                Deletar
            </Button>
            </DialogActions>
        </Dialog>
        
        <TableContainer component={Paper}>
        <Table sx={{ textAlign:"center" }} aria-label="simple table">
            <TableHead>
            <TableRow style={{backgroundColor:"#b4d5f6"}}>
                <TableCell align="center"></TableCell>
                <TableCell align="center">Nome</TableCell>
                <TableCell align="center">Telefone</TableCell>
                <TableCell align="center">Necessidade</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.filter(pessoa => (pessoa.nome.includes(search) ||pessoa.telefone.includes(search)  || pessoa.necessidade.includes(search)  || search=="")).map((row) => (
                <TableRow
                key={row.nome}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={()=>{console.log(row)}}
                >
                <TableCell align="center">
                    <div style={{display:"flex"}}>
                    <button style={{backgroundColor:"transparent", border:"none", cursor:"pointer"}} onClick={()=>{setDeleteId(row.id)}}><DeleteIcon /></button>
                    <Link to={'/cadastro/'+row.id}><button style={{backgroundColor:"transparent", border:"none", cursor:"pointer"}}><InfoIcon /></button></Link>
                    </div>
                </TableCell>
                <TableCell align="center" component="th">
                    {row.nome}
                </TableCell>
                <TableCell align="center">{row.telefone}</TableCell>
                <TableCell align="center">{row.necessidade}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </div>
    );
}