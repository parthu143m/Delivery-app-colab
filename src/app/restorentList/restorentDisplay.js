export default function RestorentDisplay({ name, place }) {
  return (
    <div className="rest-card-main">
      <div className="rest-card-main2">
        <h3 className="rest-title">{name}</h3>
        <h6>{place}</h6>
      </div>
    </div>
  )
}