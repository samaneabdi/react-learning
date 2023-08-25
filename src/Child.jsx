import { useEffect, useRef } from "react";
import { memo } from "react";
let global = 0;
const Child = ({addCounter}) =>{
    
    console.log("child is rendering");
    const ref = useRef(0);
    useEffect(() => {
        
        console.log("child is mount");
        return() =>{

            console.log("child is unmount");
        }
      }, []);

    return (
        <>
        <button onClick={()=>addCounter()}>counter</button>
        <div>child new</div>
        <button onClick={()=>{
            ref.current += 1;
            console.log(ref.current)
        }}>addRef</button>
        <div>{ref.current}</div>
        <button onClick={()=>{
            global += 1;
            console.log(global)
        }}>addGlobal</button>
        <div>{global}</div>
        </>
    )
}
export default memo(Child);