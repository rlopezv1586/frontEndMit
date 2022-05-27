import { createContext } from "react";
export const UserContext = createContext(null);

function Card (props) {
    function classes() {
        const bg = props.bgcolor ? ' bg-' + props.bgcolor: '';
        const txt = props.textcolor ? ' text-' + props.textcolor: ' text-black'
        return 'card mb-3' + bg + txt;
    }


    return (
        <div className={classes()} style={{maxWidth: '40%', alignItems: 'center'}}>
            <div className="/'">{props.header}</div>
            <div className="card-body">
                {props.title && (<h5 className='card-title text-center'>{props.title}</h5>)}
                {props.text && (<p className='card-text text-center'>{props.text}</p>)}
                {props.body}
                {props.status && (<div id='createStatus'>{props.status}</div>)}
            </div>
        </div>

    );
}

export default Card;
