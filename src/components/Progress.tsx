type ProgressType = {
progVal?:string | number | readonly string[] | undefined
}
const Progress = ({ progVal = 0}: ProgressType) => {
return ( 
<progress value={progVal}></progress>
)

}

export default Progress;
