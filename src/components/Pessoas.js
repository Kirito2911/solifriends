import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { getData } from "../services/api";

export default function Pessoas(){
    const [rows, setRows] = useState([]);
    function createData(
        nome,
        cpf,
        rg,
        telefone,
        necessidade,
      ) {
        return { nome, cpf, rg, telefone, necessidade };
      }


    useEffect(()=>{
        getData().then(result=>{
            console.log(result)
            let rowsProv = [];
            for(let i=0;i<result.length;i++){
                let a = result[i].data;
                rowsProv.push(createData(a.nome, a.cpf, a.rg, a.telefone, a.necessidade))
            }
            setRows(rowsProv)
          })
    },[])
      
    return(
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell align="right">Cpf</TableCell>
                <TableCell align="right">Rg</TableCell>
                <TableCell align="right">Telefone</TableCell>
                <TableCell align="right">Necessidade</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <TableRow
                key={row.nome}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {row.nome}
                </TableCell>
                <TableCell align="right">{row.cpf}</TableCell>
                <TableCell align="right">{row.rg}</TableCell>
                <TableCell align="right">{row.telefone}</TableCell>
                <TableCell align="right">{row.necessidade}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}