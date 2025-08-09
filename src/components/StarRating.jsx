import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

const StarRating = ({ rating, className = "text-yellow-400" }) => {
    // Validate and sanitize rating input
    const validRating = Math.max(0, Math.min(5, parseFloat(rating) || 0))

    const fullStars = Math.floor(validRating)
    const hasHalfStar = validRating % 1 !== 0
    const emptyStars = Math.max(0, 5 - Math.ceil(validRating))

    return (
        <div className="flex items-center">
            {/* Full Stars */}
            {fullStars > 0 && [...Array(fullStars)].map((_, i) => (
                <FaStar key={`full-${i}`} className={className} />
            ))}

            {/* Half Star */}
            {hasHalfStar && (
                <FaStarHalfAlt className={className} />
            )}

            {/* Empty Stars */}
            {emptyStars > 0 && [...Array(emptyStars)].map((_, i) => (
                <FaRegStar key={`empty-${i}`} className={className} />
            ))}
        </div>
    )
}

export default StarRating
