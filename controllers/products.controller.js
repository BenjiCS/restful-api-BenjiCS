const ProductRef = require("../models/product.models");
const { log } = require("../middleware/logger");

exports.createProduct = async function(req, res) {
  if (req.fields.price) {
    req.fields.price = parseFloat(req.fields.price);
  }
  if (req.fields.weight) {
    req.fields.weight = parseFloat(req.fields.weight);
  }
  try {
    const docs = await ProductRef.where("sku", "==", req.parms.sku)
      .limit(1)
      .get();
    docs.forEach(async doc => {
      try {
        doc.ref.update({ ...req.fields });
        const result = await doc.res.get();
        res.json(result.data());
      } catch (error) {
        log.error(error.stack);
        res.status(500).end();
      }
    });
  } catch (error) {
    log.error(error.stack);
    res.status(500).end();
  }
};

// exports.createProduct = function(req, res) {
//   // Add
//   req.fields.price = parseFloat(req.fields.price);
//   req.fields.weight = parseFloat(req.fields.weight);
//   ProductRef.add({ ...req.fields })
//     .then(ref => {
//       ref.get().then(doc => res.status(201).json(doc.data()));
//     })
//     .catch(error => res.json(error));
// };

exports.getAllProducts = async function (req, res) {
  try {
      let docs;
      if (req.query.category) {
          docs = await ProductRef.where("category", "==", req.query.category).get();
      } else {
          docs = await ProductRef.get()
      }
      const results = [];
      docs.forEach(doc => results.push(doc.data()));
      res.json(results);
  } catch (error) {
      res.status(500).end();
      log.error(error.stack);
  }
};

exports.getSingleProductAsync = async function(req, res) {
  try {
    const docs = await ProductRef.where("sku", "==", req.params.sku)
      .limit(1)
      .get();
    docs.forEach(doc => res.json(doc.data()));
    // res.json(getSingleProduct(docs).data());
  } catch (error) {
    log.error(error.stack);
    res.status(500).end();
  }
};

// exports.getSingleProduct = function(req, res) {
//   ProductRef.where("sku", "==", req.params.sku)
//     .get()
//     .then(docs => {
//       docs.forEach(doc => res.json(doc.data()));
//     });
// };

exports.deleteProduct = async function(req, res) {
  try {
    const docs = await ProductRef.where("sku", "==", req.params.sku).get();
    docs.forEach(doc => doc.ref.delete());
    res.status(204).end();
  } catch (error) {
    log.error(error.stack);
    res.status(500).end();
  }
};

// exports.deleteProduct = function (req, res) {
//   productref.where("sku", "==", req.params.sku).get().then(docs => {
//       docs.forEach(doc => doc.ref.delete());
//   })
//       .catch(err => res.status(500).json({ message: err }));
//   res.status(204).end();
// };

exports.patchProduct = function(req, res) {
  if (req.fields.price) {
    req.fields.price = parseFloat(req.fields.price);
  }
  if (req.fields.weight) {
    req.fields.weight = parseFloat(req.fields.weight);
  }
  productref
    .where("sku", "==", req.params.sku)
    .get()
    .then(docs => {
      docs.forEach(doc =>
        doc.ref
          .update({ ...req.fields })
          .get()
          .then(doc => res.json(doc.data()))
      );
    });
};
