import { useNavigate, useParams } from "react-router-dom"
import { useGetOneItem } from "../../hooks/useService"
import { like, remove } from "../../api/api"
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Reviews from "../reviews/Reviews";
import Comments from "../comments/Coments";

export default function Details() {

    const [isBought, setIsBought] = useState(false);
    const { itemId } = useParams()
    const [data] = useGetOneItem(itemId);

    const { isAuthenticated } = useContext(AuthContext)

    const item = data?.item || {};
    const isOwner = data?.isOwner || false;

    const itemBuyHandler = async () => {
        try {
            await like(itemId)

            setIsBought(true)
        } catch (err) {
            console.log(err.message)
        }
    }

    const navigate = useNavigate()

    const itemDeleteHandler = async () => {
        try {
            await remove(itemId)
            navigate(`/catalog`);
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <>
            <section className="details-section d-flex justify-content-center align-items-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="details-content text-center d-flex flex-column align-items-center">
                                <h2 className="text-uppercase">{item.title}</h2>
                                <img className="img-fluid d-block mx-auto details-img" src={item.image} alt="Project" />

                                <p>
                                    {item.description}
                                </p>
                                <ul className="list-inline" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                                    <li><strong>Price:</strong> ${item.price}</li>
                                    <li><strong>Brand:</strong> {item.brand}</li>
                                </ul>

                                {isAuthenticated && (
                                    <>
                                        <div className="d-flex gap-3">
                                            {isOwner ? (
                                                <>
                                                    <Link to={`/${item._id}/edit`}>
                                                        <button className="btn btn-warning btn-xl text-uppercase mt-3" type="button">
                                                            <i className="fas fa-edit me-1"></i> Edit
                                                        </button>
                                                    </Link>
                                                    <button onClick={itemDeleteHandler} className="btn btn-danger btn-xl text-uppercase mt-3" type="button">
                                                        <i className="fas fa-trash me-1"></i> Delete
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    {isBought ? (
                                                        <div className="alert alert-success text-uppercase mt-3" style={{ fontWeight: 'bold', fontSize: '1.5rem', padding: '0.5rem 1.5rem', borderRadius: '0.25rem', textAlign: 'center' }}>
                                                            Item(s) have been successfully added to your cart.
                                                        </div>
                                                    ) : (
                                                        <button onClick={itemBuyHandler} className="btn btn-success btn-xl text-uppercase mt-3" type="button">
                                                            <i className="fas fa-shopping-cart me-1"></i> Buy
                                                        </button>
                                                    )
                                                    }
                                                </>
                                            )}
                                        </div>
                                        <Reviews itemId={itemId} isOwner={isOwner} />
                                        {isAuthenticated && <Comments itemId={itemId} />}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
