import "./card.css";

const CustomCard = ({cardBody}) => {
  return (
    <>
      <div className="card col-6 custom-card">
        <div className="card-body custom-card-body">{cardBody}</div>
      </div>
    </>
  );
};

export default CustomCard;
  