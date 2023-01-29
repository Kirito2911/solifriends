import { Button, FormControlLabel, Switch, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import {deleteData, editData, getData, setData} from "../services/api";

export default function MainForm() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [necessidade, setNecessidade] = useState("");
  const [npcasa, setNpcasa] = useState("");
  const [pcd, setPcd] = useState("");
  const [profissao, setProfissao] = useState("");
  const [resp, setResp] = useState("");
  const [situacao, setSituacao] = useState("");

  useEffect(()=>{
    getData().then(result=>{
      console.log(result)
    })
  },[])

    function getDate(){

      let data={
        "nome": nome,
        "cpf":cpf,
        "rg":rg,
        "endereco":endereco,
        "telefone":telefone,
        "necessidade":necessidade,
        "np_casa":npcasa,
        "pcd":pcd,
        "profissao":profissao,
        "resp_cad":resp,
        "situacao":situacao,
      }

      setData(data).then(result=>{
        console.log("ok")
      })
    }

    return (
      <div>
        <div className="fields">
          <TextField className="nome" label="Nome" variant="outlined" value={nome} onChange={(e)=>{setNome(e.target.value)}}/>
        </div>
        <div className="fields">
          <TextField className="endereco" label="Endereço" variant="outlined" value={endereco} onChange={(e)=>{setEndereco(e.target.value)}}/>
        </div>
        <div className="fields">
        <TextField className="cpf" label="Cpf" variant="outlined" value={cpf} onChange={(e)=>{setCpf(e.target.value)}}/>
        <TextField className="rg" label="Rg" variant="outlined" value={rg} onChange={(e)=>{setRg(e.target.value)}}/>
        <TextField className="telefone" label="Telefone" variant="outlined" value={telefone} onChange={(e)=>{setTelefone(e.target.value)}}/>
        </div>
        <div className="fields">
          <TextField className="profissao" label="Profissão" variant="outlined" value={profissao} onChange={(e)=>{setProfissao(e.target.value)}}/>
          <TextField className="necessidade" label="Necessidade" variant="outlined" value={necessidade} onChange={(e)=>{setNecessidade(e.target.value)}}/>
          <TextField className="situacao" label="Situação" variant="outlined" value={situacao} onChange={(e)=>{setSituacao(e.target.value)}}/>
        </div>
        <div className="fields">
          <TextField className="nump" label="N d Pessoas na Casa" variant="outlined" value={npcasa} onChange={(e)=>{setNpcasa(e.target.value)}}/>
          <TextField className="resp" label="Responsavel pelo cadastro" variant="outlined"onChange={(e)=>{setResp(e.target.value)}}/>
          <FormControlLabel control={<Switch value={pcd} onChange={(e)=>{setPcd(e.target.value)}} />} className="pcd" label="Pcd?" sx={{color:"black"}} />
        </div>
        <div><Button onClick={()=>{getDate()}} variant="contained">Cadastrar</Button></div>
      </div>
    );
  }

