'use client';
import { useState } from "react";

export default function DisCart({name,handleRemove,price}) {
    const [count,setCount] = useState(1)

    function increment(){
        setCount(count+1)
    }

    function decrement(){
         if (count > 1) {
      setCount(count - 1);
    }
    }
    return(
            <div className="Dis">
      <div className="Dis">
        <h3 className="Discart">{name}</h3>
        <h4>{price*count}</h4>
        
        <button onClick={handleRemove}>Remove</button><br></br>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        {count}
       
        
        </div>
        </div>
    )
}





































//name
//price,button,input number,fuction handle remove 
