import "./Card.css";

import { useState } from "react";
import ABI from "./contractABI.json";
import { ethers } from "ethers";

function Card(props) {

    const [checked, setChecked] = useState(props.done)

    const toggle = async () => {

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract("0x803F43f5a269aEa70052F1D892afB62B8e738aEB", ABI, signer);

        const toggleContract = await contract.toggleTask(props.id);

        const receipt = await toggleContract.wait();
        if (receipt.confirmations > 0) {
            setChecked(!checked);
        }
        //en este if lo que hacemos es esperar a la confirmacion de la Blockchain para asegurarnos de que la transaccion fue exitosa
        //sino estuviera se checkearia la casilla antes de la confirmacion y podria fallar la transaccion en la blockchain aunque en nuestra pagina
        //saldria como ejecutada

        function convertBlockNumberToDate(blockNumber) {
            const timestamp = parseInt(props.completedTime , 16) * 15; // 15 segundos por bloque en Ethereum
            const date = new Date(timestamp * 1000);
            console.log(`La fecha y hora del bloque es: ${date}`);
        }


        const blockNumber = "Aquí va el número de bloque que quieres convertir";
        convertBlockNumberToDate(blockNumber);
      
    }

    return (
        <div class="ToDoItem">
            
            <p>{props.Name}</p>
            <input onClick={toggle} type="checkbox" checked={checked} />
            <p>{props.completedTime.toString()}</p>
            
        </div>
    );
}

export default Card;