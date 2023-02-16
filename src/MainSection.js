import "./MainSection.css";
import Cat from "./Cat.js";
//se import useEffect para que la pagina automaticamente agarrara datos cuando se inicia
import { useState, useEffect } from "react";
//se importo ethers para poder usar las funciones de ellos y poder agarrar datos de la metamask
import { ethers } from "ethers";
import Web3 from 'web3';
import ABI from "./contractABI.json";
import Card from "./Card.js";





function MainSection() {

    //esto se llaman state variables
    const [currentAccount, setCurrentAccount] = useState(null);
    const [chainName, setChainName] = useState(null);

    //se crearon muchas stateVariables que retornan 2 cosas, la variable y una
    //funcion que permite modificar esa variable.

    const [input, setInput] = useState(null);


    //vamos a crear un Array para input los datos de las tareas de la blockchain.
    const [task, setTask] = useState([]);




    //DIA PARA SUBIR EL ToDo LIST


    const change = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract("0x803F43f5a269aEa70052F1D892afB62B8e738aEB", ABI, signer);

        const createTask = await contract.createTask(input);

    }

    /*const getData = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract("0x8d11b4405A415c0892e1b5a37C02EC1A185cC355", ABI, signer);

        const total = await contract.totalTasks();
        console.log(total)

        for (var i = 0; i < total; i++) {
            const currentTask = await contract.taskList(i);
            console.log(currentTask.taskName)
        }
    }*/




    //Tarea: Hacerle un Modifier para que solo el dueño pueda agregar tareas al contrato
    //Mostrar en la pagina un time stamp de hace cuanto se completaron las tareas o a que hora.



    const getData = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract("0x803F43f5a269aEa70052F1D892afB62B8e738aEB", ABI, signer);

        const total = await contract.totalTasks();
        console.log(total)


        setTask([]);
        for (var i = 0; i < total; i++) {
            const currentTask = await contract.taskList(i);
            setTask(prevTask => [...prevTask, currentTask]);
        }
        console.log(task)


    }


    //luego creamos una funcion que se llama getWallet addess (aunque se inicialice)
    //como una constante. La PRIMERA parte de esta funcion basicamente sirve para preguntarle a MetaMask cual 
    //es el current Address que tenemos y ponerla en nuestra variable currentAccount y.

    const getWalletAddress = async () => {

        if (window.ethereum && window.ethereum.isMetaMask) {
            //este if simplemente checkea si tienes metaMask, y si lo tienes corre la funcion.

            const provider = new ethers.providers.Web3Provider(window.ethereum);

            await provider.send("eth_requestAccounts");
            const currentAddress = await provider.getSigner().getAddress();

            setCurrentAccount(currentAddress);


            const chain = await provider.getNetwork();
            setChainName(chain.name);
            console.log(provider)

            const accounts = await provider.send("eth_requestAccounts");
            console.log(accounts);
            provider.getSigner(accounts[0])

        }
    }

    const [userAddress, setUserAddress] = useState(null);

    const connectWallet = async () => {
        console.log("CW: Running connectWallet");
        if (window.ethereum && window.ethereum.isMetaMask) {
            console.log("CW: Wallet detected")

            console.log("CC: Getting provider:");
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log(provider);

            console.log("CW: Requesting accounts");
            const accounts = await provider.send("eth_requestAccounts");

            console.log("CW: Accounts detected:");
            console.log(accounts);

            console.log("CW: Getting signer:");
            const signer = provider.getSigner();
            console.log(signer);

            console.log("CW: Getting user's address");
            const address = await signer.getAddress();
            console.log(address);

            console.log("CW: Setting userAddress");
            setUserAddress(address);
            return address;
        }
    }

    //esta es una pequeña funcion que dice que cuando se cambia la cadena, refresque la pagina. Theo la uso, pero no entiendo porque
    //cuando uno simplemente puede usar otra vez la funcion principal de getWalletaddress y automaticamente retorna los datos completos
    //cuando uno cambia la cadena. 
    const chainChanged = () => {
        window.location.reload();
    }
    //estas dos funciones dicen que cuando uno cambia la cadena o cambia de cuenta, automaticamente se ejecute la funcion que esta
    //adentro del ().
    window.ethereum.on('chainChanged', getWalletAddress);
    window.ethereum.on('accountsChanged', getWalletAddress);


    useEffect(() => {
        getWalletAddress();
        getData();
        connectWallet();
    }, []);

    //esto se llama un useEffect Hook. y significa que en vez de tener que hacerle click en un boton simplemente
    //se ejecuta cuando se carga la pagina. teniendo esta funcion, tecnicamente se podria quitar el boton que tenemos.



    //no se porque adentro del return no se pueden poner comentarios pero lo que hacemos aqui abajo es
    //retornar escrita toda la info que obtuvimos arriba y la mostramos en forma de texto en base a las StateVariables que creamos arriba
    //para mostrar una variable es necesario que sea una state variable.
    return (
        <div class="MainSection">
            <div class="Content">

                <p>Current Account: {currentAccount}</p>
                <p> Chain name: {chainName}</p>
                <input value={input} onInput={e => setInput(e.target.value)} />

                <button onClick={change}>Update Task</button>
                <button onClick={getWalletAddress}> Connect Wallet </button>


                {task.map((item) => (
                    <Card Name={item.taskName} id={item.id} done={item.completedYet} completedTime={item.completedTime} />
                    )) }


            </div>

            <div class="Sidebar">
                <Cat id="289" name="Matiu" />
                <Cat id="300" name="Pacho" />
                <Cat id="303" name="Juanes" />
                <Cat id="301" name="Fepe" />
            </div>
        </div>
    );

}

    //estos son los props, que van hacia abajo en la jerarquia y llaman a archivos mas "pequeños o inferiores" ej: en Cat.js Name: {props.name} y este .name
    //hace referencia a Matiu, Pacho, etc.

    //El codigo task.map((item)) es basicamente un for loop que coge cada item crea un Card y les pide el nombre, el id y si son true o false.
export default MainSection;
