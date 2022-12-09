import './Stu.css';
const Student = (props) => {
    return (
        <div className="stu">
            <button onClick={props.del} id="box">X</button>
        </div>
    )
}

export default Student