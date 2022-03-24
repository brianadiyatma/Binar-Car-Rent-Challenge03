const tables = require("../../models/tables");

exports.view = (req, res) => {
  const locals = {
    title: "Dashboard",
    layout: "./layouts/sidebar",
    dataTableAtas: tables.tableAtas,
    dataTableBawah: tables.tableBawah,
  };

  res.render("pages/index", locals);
};
