import { useState } from "react";
import { toast } from "react-toastify";

const useCarActions = () => {
    const [isFavorite, setIsFavorite] = useState(false);

    // Handle favorite toggle
    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
        toast.success(
            isFavorite ? "Removed from favorites" : "Added to favorites"
        );
    };

    // Handle share
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: "Car Rental",
                text: "Check out this car for rent!",
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to clipboard!");
        }
    };

    return {
        isFavorite,
        toggleFavorite,
        handleShare,
    };
};

export default useCarActions;
