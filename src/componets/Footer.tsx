import React from "react";
import styles from "./Footer.module.css"

const Footer = () => {
    return(
        <footer className={styles.footer}>
            <p>
                <span>Buscador de cep</span>  @SENAI
            </p>
        </footer>
    );
}

export default Footer