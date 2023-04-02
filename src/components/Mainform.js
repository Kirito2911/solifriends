import { Button, FormControlLabel, Switch, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {deleteData, editData, getData, setData} from "../services/api";

export default function MainForm() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [necessidade, setNecessidade] = useState("");
  const [npcasa, setNpcasa] = useState("");
  const [pcd, setPcd] = useState(false);
  const [profissao, setProfissao] = useState("");
  const [resp, setResp] = useState("");
  const [situacao, setSituacao] = useState("");
  const navigate = useNavigate();

  
  useEffect(()=>{
    if(!!window.location.pathname.split('/')[2]){
      getData().then(result=>{
        for(let i=0;i<result.length;i++){
          if(result[i].id==window.location.pathname.split('/')[2]){
            setNome(result[i].data.nome)
            setCpf(result[i].data.cpf)
            setRg(result[i].data.rg)
            setEndereco(result[i].data.endereco)
            setTelefone(result[i].data.telefone)
            setNecessidade(result[i].data.necessidade)
            setNpcasa(result[i].data.np_casa)
            setPcd(result[i].data.pcd)
            setProfissao(result[i].data.profissao)
            setResp(result[i].data.resp_cad)
            setSituacao(result[i].data.situacao)
          }
        }
      })
    }
    if(!window.location.pathname.split('/')[2]){
            setNome("")
            setCpf("")
            setRg("")
            setEndereco("")
            setTelefone("")
            setNecessidade("")
            setNpcasa("")
            setPcd(false)
            setProfissao("")
            setResp("")
            setSituacao("")
    }
  },[])

    function setDate(){
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
      navigate('/pessoas')
    }

    return (
      <div>
        <div className="fields">
          <TextField className="nome" disabled={!!window.location.pathname.split('/')[2]} label="Nome" variant="outlined" value={nome} onChange={(e)=>{setNome(e.target.value)}}/>
        </div>
        <div className="fields">
          <TextField className="endereco" disabled={!!window.location.pathname.split('/')[2]} label="Endereço" variant="outlined" value={endereco} onChange={(e)=>{setEndereco(e.target.value)}}/>
        </div>
        <div className="fields">
          <TextField className="cpf" disabled={!!window.location.pathname.split('/')[2]} label="Cpf" variant="outlined" value={cpf} onChange={(e)=>{setCpf(e.target.value)}}/>
          <TextField className="rg" disabled={!!window.location.pathname.split('/')[2]} label="Rg" variant="outlined" value={rg} onChange={(e)=>{setRg(e.target.value)}}/>
          <TextField className="telefone" disabled={!!window.location.pathname.split('/')[2]} label="Telefone" variant="outlined" value={telefone} onChange={(e)=>{setTelefone(e.target.value)}}/>
          <TextField className="profissao" disabled={!!window.location.pathname.split('/')[2]} label="Profissão" variant="outlined" value={profissao} onChange={(e)=>{setProfissao(e.target.value)}}/>
          <TextField className="necessidade" disabled={!!window.location.pathname.split('/')[2]} label="Necessidade" variant="outlined" value={necessidade} onChange={(e)=>{setNecessidade(e.target.value)}}/>
          <TextField className="situacao" disabled={!!window.location.pathname.split('/')[2]} label="Situação" variant="outlined" value={situacao} onChange={(e)=>{setSituacao(e.target.value)}}/>
          <TextField className="nump" disabled={!!window.location.pathname.split('/')[2]} label="Número de Pessoas na Casa" variant="outlined" value={npcasa} onChange={(e)=>{setNpcasa(e.target.value)}}/>
          <TextField className="resp" disabled={!!window.location.pathname.split('/')[2]} label="Responsável pelo cadastro" variant="outlined"onChange={(e)=>{setResp(e.target.value)}}/>
          <FormControlLabel  disabled={!!window.location.pathname.split('/')[2]} control={<Switch checked={pcd} onChange={(e)=>{setPcd(!pcd)}} />} className="pcd" label="Pcd?" sx={{color:"black"}} />
        </div>
        {!!window.location.pathname.split('/')[2] ? <></>:<div><Button onClick={()=>{setDate()}} variant="contained">Cadastrar</Button></div>}
      </div>
    );
  }

