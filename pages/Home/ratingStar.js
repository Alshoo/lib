export default function RatingStars({ rating }) {
  const fullStars = Math.max(0, Math.floor(rating));
  const halfStar = rating % 1 !== 0;
  const emptyStars = Math.max(0, 5 - fullStars - (halfStar ? 1 : 0));

  return (
    <div className="star-rating">
      {Array(fullStars)
        .fill()
        .map((_, i) => (
          <span key={`full-${i}`} className="star full">
            ★
          </span>
        ))}
      {halfStar && (
        <span key="half" className="star half">
          ★
        </span>
      )}
      {Array(emptyStars)
        .fill()
        .map((_, i) => (
          <span key={`empty-${i}`} className="star empty">
            ★ 
          </span>
        ))} 
    </div>
  );
}
