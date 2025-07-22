import { useContext } from "react";
import PersonalCatalogItem from "./personal-catalog-item/PersonalCatalogItem";
import { AuthContext } from "../../contexts/AuthContext";
import { useGetAllItems } from "../../hooks/useService";

export default function PersonalCatalog() {

    const { userId } = useContext(AuthContext);

    const [items] = useGetAllItems();

    const ownerItems = items.filter(item => item.owner === userId);

    return (
        <section className="page-section personal-catalog">
            <div className="container">
                <div className="text-center">
                    <h2 className="section-heading text-uppercase">My Products</h2>
                    <h3 className="section-subheading text-muted fw-bold fs-4" style={{ fontFamily: "Poppins, sans-serif" }}>
                        Manage your uploaded products
                    </h3>
                </div>
                <div className="row">
                    {ownerItems.length ?
                        ownerItems.map(item => <PersonalCatalogItem key={item._id} {...item} />)
                        :
                        <div className="pt-5"> 
                            <h1 className="text-center text-muted">You haven't uploaded any products yet</h1>
                        </div>
                    }
                </div>
            </div>
        </section>
    );
}

