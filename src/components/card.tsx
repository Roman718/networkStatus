import React, {useState, useEffect} from 'react';
import axios from "axios";
import Connected from "./connected";
import Disconnected from "./disconnected";

type CardProps = {name:string, img:string}

const Card:React.FC<CardProps> = ({name, img}) => {
    const [status, setStatus] = useState(false);
    const getStatusHandler = () => {
        axios.get<boolean>(`https://app.subsocial.network/subid/api/v1/check/${name}`)
            .then(({data}) => {
                //может быть стоит использовать setInterval, чтобы у человека если пропала связь, а потом появилась, то запросы продолжили обновляться
                setTimeout(getStatusHandler, 300000);
                setStatus(data)})
    }
    useEffect(() => {
        getStatusHandler()
    }, []);
    return (
        <div className={`card ${status ? 'connect' : 'dis'}`}>
            <img src={`https://app.subsocial.network/subid/icons/${img}`} alt="" className='card__img'/>
            <p className='card__title'>{name}</p>
            {status ? <Connected/> : <Disconnected/>}
        </div>
    );
};

export default Card;