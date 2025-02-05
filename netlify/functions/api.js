import express, { Router } from "express";

import "dotenv/config";

import ServerlessHttp from "serverless-http";

const router = Router();
const app = express();

// const port = process.env.PORT || 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;

// add a new tea
router.post("/teas", (req, res) => {
  const { name, price } = req.body;

  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

//get all teas
router.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

// get a tea with id
router.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));

  if (!tea) {
    return res.status(404).send("Tea not found");
  }

  res.status(200).send(tea);
});

//update tea

router.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));

  if (!tea) {
    return res.status(404).send("Tea not found");
  }

  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);
});

//delete tea

router.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).send("Tea not found");
  }
  teaData.splice(index, 1);
  return res.status(200).send("Tea Deleted ");
});

// app.listen(port, () => {
//   console.log(`Server is running at port: ${port}...`);
// });

app.use("/api/", router);
export const handler = ServerlessHttp(app);
