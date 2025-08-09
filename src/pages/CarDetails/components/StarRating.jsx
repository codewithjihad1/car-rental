import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

const StarRating = ({ rating }) => {
    // Validate and sanitize rating input
    const validRating = Math.max(0, Math.min(5, parseFloat(rating) || 0))

    const stars = []
    const fullStars = Math.floor(validRating)
    const hasHalfStar = validRating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
        stars.push(<FaStar key={i} className="text-yellow-400" />)
    }

    if (hasHalfStar) {
        stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />)
    }

    const emptyStars = Math.max(0, 5 - Math.ceil(validRating))
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />)
    }

    return <div className="flex items-center">{stars}</div>
}

export default StarRating
