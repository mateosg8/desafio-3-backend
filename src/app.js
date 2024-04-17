import express from "express";
import { ProductManager } from "./ProductManager.js";

const productManager = new ProductManager("productos.json");
const app = express();
app.use(express.json());

app.get("/products", async (req, res) => {
  try {
    let limite2 = req.query.limit;
    if (limite2) {
      let products = await productManager.getProducts();
      let limite3 = products.slice(0, limite2);
      return res.send(limite3);
    } else {
      let products = await productManager.getProducts();
      return res.json(products);
    }
  } catch (error) {
    res.status(500).end(error);
  }
});

app.get("/products/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);

  /*  res.json(products)

    

    const productIdx = products.findIndex(p => p.id === id) */

  try {
    let products2 = await productManager.getProductById(id);

    return res.send(products2);
  } catch (error) {
    res.status(500).end(error);
  }
});

/*   if(productIdx < 0) {
        return res.status(404).json({status: "error", message: 'Product not found'})
    }

    products[productIdx] = product

    res.json({status: 'success', message: 'Product actualizado'})
})  */

app.listen(8080);
