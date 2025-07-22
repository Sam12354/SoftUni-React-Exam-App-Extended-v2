import { useEffect, useState, useContext } from "react";
import { getReviews, createReview, getAverageRating } from "../../api/review-api";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function Reviews({ isOwner }) {
    const { itemId } = useParams();
    const { isAuthenticated } = useContext(AuthContext);

    const [reviews, setReviews] = useState([]);
    const [stars, setStars] = useState(5);
    const [average, setAverage] = useState({ average: 0, count: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const revs = await getReviews(itemId);
            setReviews(revs);

            const avg = await getAverageRating(itemId);
            setAverage(avg);

            setLoading(false);
        } catch (err) {
            setError(err.message || "Failed to load reviews");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [itemId]);

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await createReview(itemId, stars);
            setStars(5);
            fetchReviews();
        } catch (err) {
            setError(err.message || "You have already reviewed this item");
        }
    };

    if (loading) return <p>Loading reviews...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <section className="reviews-section mt-4">
            <h3>Reviews ({average.count}) - Average Rating: {average.average.toFixed(1)} / 5</h3>

            {reviews.length === 0 && <p>No reviews yet.</p>}

            {/* Show review form only if user is authenticated AND NOT the owner */}
            {isAuthenticated && !isOwner && (
                <form onSubmit={onSubmit} className="mb-3">
                    <label htmlFor="stars">Your rating:</label>
                    <select
                        id="stars"
                        value={stars}
                        onChange={(e) => setStars(Number(e.target.value))}
                        className="form-select w-auto d-inline-block ms-2"
                    >
                        {[5, 4, 3, 2, 1].map((n) => (
                            <option key={n} value={n}>
                                {n} ⭐
                            </option>
                        ))}
                    </select>
                    <button type="submit" className="btn btn-primary ms-3">
                        Add Review
                    </button>
                </form>
            )}
        </section>
    );
}