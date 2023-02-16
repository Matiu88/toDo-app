import "./Cat.css";

function Cat(props) {
    //aqui estamos creando una funcion para poner un gato diferente dependiendo del ID asignado, asi siempre va a cambiar la URL con respecto a su ID.
    return (
        <div class="Cat">
            <img class="kitten" src={"https://placekitten.com/" + props.id + "/300"} />
            <p>Name: {props.name }</p>
        </div>
    );
}

export default Cat;