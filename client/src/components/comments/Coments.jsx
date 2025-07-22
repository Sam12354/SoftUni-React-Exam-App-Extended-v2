import { useEffect, useState, useContext } from "react";
import { getComments, createComment } from "../../api/comment-api";
import { AuthContext } from "../../contexts/AuthContext";

export default function Comments({ itemId }) {
    const { isAuthenticated } = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(10);

    // Accepts a parameter to decide whether to show loading spinner
    const fetchComments = async (showLoading = true) => {
        try {
            if (showLoading) setLoading(true);
            const data = await getComments(itemId);
            setComments(data);
            if (showLoading) setLoading(false);
        } catch (err) {
            setError(err.message || "Failed to load comments");
            if (showLoading) setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments(); // initial fetch with loading spinner
    }, [itemId]);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        try {
            await createComment(itemId, content);
            setContent("");
            await fetchComments(false); // fetch without loading spinner to prevent flicker
        } catch (err) {
            setError(err.message || "Failed to create comment");
        }
    };

    const showMore = () => {
        setVisibleCount((count) => count + 10);
    };

    if (loading) return <p>Loading comments...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <section className="comments-section mt-4">
            <h3>Comments ({comments.length})</h3>

            {isAuthenticated && (
                <form onSubmit={onSubmit} className="mb-3">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="form-control comment-box mb-2"
                        rows={3}
                        placeholder="Write your comment..."
                        required
                    />
                    <button type="submit" className="btn btn-primary">
                        Add Comment
                    </button>
                </form>
            )}

            {comments.length === 0 && <p>No comments yet.</p>}

            <ul className="list-group">
                {comments.slice(0, visibleCount).map((c) => (
                    <li key={c._id} className="list-group-item">
                        <strong>{c.userId.email}</strong>
                        <p className="mb-0">{c.text}</p>
                    </li>
                ))}
            </ul>

            {visibleCount < comments.length && (
                <button onClick={showMore} className="btn btn-secondary mt-2">
                    Show More
                </button>
            )}
        </section>
    );
}