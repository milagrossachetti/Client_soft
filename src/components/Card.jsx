import '../styles/card.css';


const Card = ({title, icon, description}) => {
    return(
        <div id="card">
            <div id="icon">{icon}</div>
            <div id="container-title"><p id="title">{title}</p></div>
            <div id="container-description"><p id="description">{description}</p></div>
        </div>
    )
}

export default Card;