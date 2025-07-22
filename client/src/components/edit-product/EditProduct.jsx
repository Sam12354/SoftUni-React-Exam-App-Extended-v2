import { useNavigate, useParams } from "react-router"
import { useGetOneItem } from "../../hooks/useService"
import { useForm } from "../../hooks/useForm"
import { update } from "../../api/api"
import { useEffect, useState } from "react"

const initialValues = {
    title: '',
    brand: '',
    price: '',
    image: '',
    description: '',
}

export default function EditProduct() {
    const [error, setError] = useState('')

    const navigate = useNavigate()
    const { itemId } = useParams()
    const [item] = useGetOneItem(itemId)

    const { changeHandler, onSubmit, values, changeValues } = useForm(Object.assign(initialValues, item), async (values) => {
        try {
            await update(itemId, values)
            navigate(`/${itemId}`);
        } catch (err) {
            setError(err.error || 'Update failed');
            changeValues(values); 
        }
    })

    useEffect(() => {
        if (item?.item) {
            changeValues({ ...item.item });
        }
    }, [item]);

    return (
        <section className="page-section bg-light d-flex align-items-center justify-content-center vh-100"
            style={{ background: "url('/images/header-bg.jpg') center/cover no-repeat" }}>
            <div className="container">
                <div className="text-center">
                    <h2 className="section-heading text-uppercase" style={{ color: "#ffc800" }}>Edit Product</h2>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="card shadow p-4 bg-white">
                            {error && (
                                <div className="alert alert-danger text-center mb-3">
                                    {error}
                                </div>
                            )}
                            <form onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Product Name</label>
                                    <input
                                        onChange={changeHandler}
                                        value={values.title}
                                        type="text"
                                        className={`form-control ${error ? 'error' : ''}`}
                                        id="name"
                                        name="title"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Price ($)</label>
                                    <input
                                        onChange={changeHandler}
                                        value={values.price}
                                        type="number"
                                        className={`form-control ${error ? 'error' : ''}`}
                                        id="price"
                                        name="price"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label">Image URL</label>
                                    <input
                                        onChange={changeHandler}
                                        value={values.image} type="url"
                                        className={`form-control ${error ? 'error' : ''}`}
                                        id="image"
                                        name="image"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="brand" className="form-label">Brand</label>
                                    <input
                                        onChange={changeHandler}
                                        value={values.brand} type="text"
                                        className={`form-control ${error ? 'error' : ''}`}
                                        id="brand"
                                        name="brand"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        onChange={changeHandler}
                                        value={values.description}
                                        className={`form-control ${error ? 'error' : ''}`}
                                        id="description"
                                        name="description"
                                        rows="3"
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Update Product</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}