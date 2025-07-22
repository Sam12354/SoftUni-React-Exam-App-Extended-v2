import { Link, useNavigate } from "react-router-dom";
import { remove } from "../../../api/api";

export default function PersonalCatalogItem({ _id, title, price, image }) {

    const navigate = useNavigate()

    const itemDeleteHandler = async (itemId) => {
        try {
            await remove(itemId)
            
            navigate(`/catalog`);
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div className="col-lg-4 col-sm-6 mb-4">
            <div className="portfolio-item">
                <img className="img-fluid" src={image} alt="Product 1" />
                <div className="portfolio-caption">
                    <div className="portfolio-caption-heading">{title}</div>
                    <div className="portfolio-caption-subheading text-muted">${price}</div>
                    <Link to={`/${_id}/edit`}>
                        <button className="btn btn-primary btn-lg mt-2">Edit</button>
                    </Link>
                    <button onClick={() => itemDeleteHandler(_id)} className="btn btn-danger btn-lg mt-2 ms-2">Delete</button>
                </div>
            </div>
        </div>
    )
}