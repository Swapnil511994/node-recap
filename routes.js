import ProductRoute from "./modules/products/routes/product.route.js";

const modules = [
  {
    path: "/products",
    router: ProductRoute,
  },
];

const registerRoutes = (app) => {
  app.get("/", (req, res) => {
    res.json({ status: true, message: "Working Fine", data: null });
  });
  modules.forEach((module) => {
    app.use(module.path, module.router);
  });
};

export default registerRoutes;
