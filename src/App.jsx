import './App.css';
import Header from "./components/Header";
import {useEffect, useState} from "react";
import Form from "./components/Form";
import Product from "./components/Product";
import {collection, onSnapshot} from "firebase/firestore";
import {getProducts} from "./services/Product.services";

function App() {
    // Se crea un estado para el formulario de registro de productos
    const [formRegistration, setFormRegistration] = useState(false);
    // Se crea un estado para el listado de productos
    const [listProducts, setProductList] = useState([]);
    // Se crea un estado para el modo de edición de productos
    const [modeEdition, setModeEdition] = useState(false);
    // Se crea un estado para el producto a editar
    const [productEdit, setProductEdit] = useState(null);

    useEffect( () => {
        const getData = async () => {
            const data = await getProducts();
            setProductList(data);
        }
        getData();
    }, []);

    return (
        <div className="App">
            <Header
                setFormRegistration={setFormRegistration}
                formRegistration={formRegistration}
                listProducts={listProducts}
                setProductList={setProductList}
            />
            <div className="container">
                <div className="row row-cols-3">
                    {
                        listProducts.map((product, index) => (
                            <div className="col mb-4" key={index.id}>
                                <Product
                                    product={product}
                                    setModeEdition={setModeEdition}
                                    setProductEdit={setProductEdit}
                                />
                            </div>
                        ))
                    }
                </div>
                <div className="mt-5 mb-5">
                    {
                        modeEdition ? (
                            <Form
                                setFormRegistration={setFormRegistration}
                                listProducts={listProducts}
                                setProductList={setProductList}
                                modeEdition={modeEdition}
                                setModeEdition={setModeEdition}
                                productEdit={productEdit}
                                setProductEdit={setProductEdit}
                            />
                        ):(
                            <></>
                        )
                    }
                </div>
            </div>

        </div>
    );
}

export default App;
