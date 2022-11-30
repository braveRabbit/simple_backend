const express = require("express");
const SitesController = require("../controllers/sites.controller");
const SitesValidations = require("../validations/sites.validations");
const router = express.Router();

router.get(
  "/:siteId/contacts",
  SitesValidations.getContacts,
  SitesController.getContacts
);

router.get(
  "/:siteId/contacts/:contactId",
  SitesValidations.getContacts,
  SitesController.getContactById
);

router.post(
  "/:siteId/contacts",
  SitesValidations.getContacts,
  SitesController.addContacts
);

router.post(
  "/:siteId/contacts/:contactId",
  SitesValidations.getContacts,
  SitesController.updateContact
);

router.get("/", (req, res, next) => {
  res.status(200).json({
    success: true,
  });
});

module.exports = router;
