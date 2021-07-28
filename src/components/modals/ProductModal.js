import Modal from "react-modal";

//state
import { useState } from "react";

import { CreateButtonStyled } from "../../styles";
import productStore from "../../stores/productStore";

//import { styles } from "ansi-colors";

const ProductModal = (props) => {
    const [product, setProduct] = useState(
        props.oldProduct || {
            name: "",
            price: 0,
            description: "",
            image: "",
        });
    /*
   props.oldProduct
     ? props.oldProduct
     : {
         name: "",
         price: 0,
         description: "",
         image: "",
       }
       */
    const handleChange = (event) => {
        setProduct({ ...product, [event.target.name]: event.target.value });
    };

    const handleImage = (event) => {
        setProduct({ ...product, image: event.target.files[0] });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (props.oldProduct) productStore.productUpdate(product);
        else productStore.productCreate(product, props.bakery);
        props.closeModal();
    };
    return (
        <div>
            <Modal
                isOpen={props.isOpen}
                onRequestClose={props.closeModal}
                contentLabel="Product Modal"
            >
                <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                        <div className="col-6">
                            <label>Name</label>
                            <input
                                className="form-control"
                                type="text"
                                onChange={handleChange}
                                name="name"
                                value={product.name}
                            />
                        </div>
                        <div className="col-6">
                            <label>Price</label>
                            <input
                                className="form-control"
                                type="number"
                                min="1"
                                onChange={handleChange}
                                name="price"
                                value={product.price}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input
                            className="form-control"
                            type="text"
                            onChange={handleChange}
                            name="description"
                            value={product.description}
                        />
                    </div>
                    <div className="form-group">
                        <label>Image</label>
                        <input
                            className="form-control"
                            type="file"
                            onChange={handleImage}
                            name="image"
                        />
                    </div>
                    <CreateButtonStyled>
                        {props.oldProduct ? "Update" : "Add"}
                    </CreateButtonStyled>
                </form>
            </Modal>
        </div>
    );
};

export default ProductModal;