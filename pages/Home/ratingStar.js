

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="star-rating">
        {Array(emptyStars).fill(<span className="star empty">★</span>)}
      {Array(fullStars).fill(<span className="star full">★</span>)}
      {halfStar && <span className="star half">★</span>}
    </div>
  );
};

export default RatingStars;
