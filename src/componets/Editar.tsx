import React,{Component,useState,ChangeEvent,FormEvent,useEffect} from "react";
import Footer from "./Footer";
import Header from "./Header";
import Styles from '../App.module.css';
import { useParams } from "react-router-dom";
import axios from "axios";


const Editar =()=>{

    const[nome, setNome] = useState<string>("");
    const[email, setEmail] = useState<string>("");
    const[cpf, setCpf] = useState<string>("");
    const[id, setId] = useState<number>();

    const parametro = useParams();

    const atualizar = (e: FormEvent)=>{
        e.preventDefault();

        const dados = {
            id: id,
            nome:nome,
            email:email,
            cpf:cpf
        }
        axios.put("http://10.137.9.134:8000/api/update", dados,
        {
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            }
        }).then(function(response){
            window.location.href= "/listagem";
        }).catch(function(error){
            console.log('ocorreu um erro ao atualizar');
            
        })
    }

    useEffect(()=> {
        async function fetchData() {
            try{
                const response = await axios.get("http://10.137.9.134:8000/api/find/"+ parametro.id);
                setNome(response.data.data.nome);
                setEmail(response.data.data.email);
                setCpf(response.data.data.cpf);
                setId(response.data.data.id);
            }catch(error){
                console.log("erro ao buscar dados da api");
                
            }
        }
        fetchData();
    }, []);


    const handleState = (e: ChangeEvent<HTMLInputElement>) =>{
        if(e.target.name=== "nome"){
            setNome(e.target.value)
        } 
        if(e.target.name=== "email"){
            setEmail(e.target.value)
        }   
        if(e.target.name=== "cpf"){
            setCpf(e.target.value)
        } 
    }

    return(
        <div>
            <Header />
            <main className={Styles.main}>
                <div className='container'>
                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>Cadastrar Cliente</h5>
                            <form onSubmit={atualizar} className='row g-3'>
                            <div className='col-6'>
                                <label htmlFor="nome" className='form-label'>nome</label>
                                <input type="text" name='nome' className='form-control' required  onChange={handleState} value={nome}/>
                            </div>
                            <div className='col-6'>
                            <label htmlFor="email" className='form-label'>email</label>
                                <input type="text" name='email' className='form-control' required onChange={handleState} value={email}/>
                            </div>
                            <div className='col-6'>
                            <label htmlFor="cpf" className='form-label'>cpf</label>
                                <input type="text" name='cpf' className='form-control' required onChange={handleState} value={cpf}/>
                            </div>
                            <div className='col-12'>
                                <button type='submit' className='btn btn-success bt-sm'>Cadastrar</button>
                            </div>
                        </form></div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Editar;