const RatingStars = ({ rating }) => {
  const fullStars = Math.max(0, Math.floor(rating));
  const halfStar = rating % 1 !== 0;
  const emptyStars = Math.max(0, 5 - fullStars - (halfStar ? 1 : 0));

  return (
    <div className="star-rating">
      {Array(fullStars).fill(<span className="star full">★</span>)}
      {halfStar && <span className="star half">★</span>}
      {Array(emptyStars).fill(<span className="star empty">★</span>)}
    </div>
  );
};

export default RatingStars;
