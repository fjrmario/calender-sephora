const DateSelect = ({ date }) => {

    return (
        <p>
            <span>Default selected date:</span>{date.toLocaleString()}
        </p> 
    )
}
    

export default DateSelect;