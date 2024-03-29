import React, {useState, ChangeEvent, FormEvent, useEffect} from "react";

import  Styles  from '../App.module.css';
import Footer from "./Footer";
import Header from "./Header";

const BuscaCep = () => {

    const [cep, setCep] = useState<string>("");
    const [localidade, setLocalidade] = useState<string>("");
    const [uf, setUf] = useState<string>("");
    const [erro, setErro] = useState<string>("");

    const findCep = (e: FormEvent) => {
        e.preventDefault();

        fetch('https://viacep.com.br/ws/'+cep+'/json/',
        {
            method: 'GET'
        }).then(response => response.json())
        .then(
            data => {
                setLocalidade(data.localidade);
                setCep(data.cep);
                setUf(data.uf);
                setErro(data.erro);
            }
        ).catch(error=>{setErro("pesquisa Invalida")});
        
    }
    const submitForm = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.name === "cep"){
            setCep(e.target.value);
        }
    }

    return(
        <div>
            <Header/>
            <main className={Styles.main}>
            <form onSubmit={findCep}>
                <label htmlFor="cep">CEP</label>
                <input type="text" name="cep" id="cep" onChange={submitForm}/>
                <input type="submit" value="pesquisar"/>
            </form>
            <p>cidade: {localidade}</p> 
            <p>Estado: {uf}</p> 
            <p>cep: {cep}</p> 
            <p className={Styles.error}>{erro}</p>
            </main>
            <Footer/>
        </div>
    )
}
export default BuscaCep