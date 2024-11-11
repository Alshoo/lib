export default function RatingStars2({ rating }) {
  const fullStars = Math.max(0, Math.floor(rating));
  const halfStar = rating % 1 !== 0;
  const emptyStars = Math.max(0, 5 - fullStars - (halfStar ? 1 : 0));

  return (
    <div className="star-rating2">
      {Array.from({ length: fullStars }, (_, i) => (
        <span key={`full-${i}`} className="star2 full2">★</span>
      ))}
      {halfStar && <span key="half" className="star2 half2">★</span>}
      {Array.from({ length: emptyStars }, (_, i) => (
        <span key={`empty-${i}`} className="star2 empty2">★</span>
      ))}
    </div>
  );
}
