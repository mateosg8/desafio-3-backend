//const { log } = require('console');
import fs from "fs";
//const { title } = require('process');
let path = "productos.json";

export class ProductManager {
  constructor(path) {
    this.nextId = 1;
    this.path = path;
    console.log("Productos cargados");
  }

  //CARGAR LOS PRODUCTOS
  async loadProductsFromDisk() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  //GUARDAR EN EL DISCO

  async saveProductsToDisk(data) {
    try {
      const data = JSON.stringify(data);
      await fs.promises.writeFile(this.path, data);
    } catch (error) {
      console.log("No se pudo guardar el archivo de productos");
    }
  }

  //
  async addProduct(product) {
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      console.error("todos los campos son obligatorios");
      return;
    }

    const lastProduct = this.loadProductsFromDisk()[this.products.length - 1];

    let nextId = 1;
    if (lastProduct) {
      nextId = lastProduct.id + 1;
    }
    const newProduct = { id: nextId, ...product };
    manager.saveProductsToDisk().push(newProduct);
    await this.saveProductsToDisk();
    console.log("Producto agregado:", newProduct);
  }
  //
  async getProductById(id) {
    const productInFile = await this.loadProductsFromDisk();
    const productFounded = productInFile.find((product) => product.id === id);
    if (productFounded) {
      return productFounded;
    } else {
      console.error("Not found");
      return null;
    }
  }
  //
  async getProducts() {
    this.products = await this.loadProductsFromDisk();
    return this.products;
  }
  //
  isCodeDuplicate(code) {
    return manager
      .loadProductsFromDisk()
      .some((product) => product.code === code);
  }
  //
  async deleteProduct(id) {
    await this.loadProductsFromDisk();
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      return;
    }

    manager.saveProductsToDisk().splice(index, 1);
    await this.saveProductsToDisk();
    console.log(`Producto con ID ${id} a sido eliminado`);
  }
  //
  async updateProduct(id, updatedFields) {
    await this.loadProductsFromDisk();
    const product = await this.getProductById(id);
    if (!product) {
      return;
    }
    Object.keys(updatedFields).forEach((key) => {
      product[key] = updatedFields[key];
    });
    await this.saveProductsToDisk();
    console.log("Producto actualizado");
  }
}

/*

//declaro una funcion asincronica
const main = async () => {

  const manager= await new ProductManager("./productos.json");

  //utilizo await delante de todo metodo asincronico de mi clase
      await manager.addProduct({
      title: "Camiseta",
      description: "Caniseta de algodon",
      price: "20",
      thumbnail: "/path/to/thumbnail.jpg",
      code: "P0010000",
      stock: "10",
  });

  await manager.addProduct({
      title: "Pantalon",
      description: "Pantalon vaquero",
      price: "30",
      thumbnail:"/path/to/thumbnail2.jpg",
      code: "P002",
      stock: "5",
  });

  console.log("Todos los productos:", await manager.getProducts());

  console.log("Producto con ID 2:", await manager.getProductById(2));

  await manager.deleteProduct(1);

  
}


main()
*/
