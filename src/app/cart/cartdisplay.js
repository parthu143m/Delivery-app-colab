export default function DisCart({name,handleRemove,price}) {
    return(
            <div className="Dis">
      <div className="Dis">
        <h3 className="Discart">{name}</h3>
        <h4>{price}</h4>
        
        <button onClick={handleRemove}>Remove</button><br></br>
        <input type="number"defaultValue={1} min={1} ></input>
        </div>
        </div>
    )
}





































//name
//price,button,input number,fuction handle remove 
