
export function ProductCard({ name, price, imageUrl }) {
    return (
        <div className="product-card">
            <img src={imageUrl} alt={name} className="product-card-image" />
            <div className="productcard">
                <h3 className="producttitle">{name}</h3>
            
                <p className="productprice">{"₹"+price}</p>
                
            </div>
        </div>
    );
}