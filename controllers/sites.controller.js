const SitesValidations = require("../validations/sites.validations");
const sideContect = require("../models/SiteContact");
const { where } = require("sequelize");
const SiteContact = require("../models/SiteContact");
const SitesController = {
  getContacts: (req, res, next) => {
    try {
      //   const errors = SitesValidations.getContacts(req);
      //   if (!errors.isEmpty()) {
      //     throw {
      //       name: "validationError",
      //       errors: errors.array(),
      //     };
      //   }
      const siteId = req.param.siteId;
      sideContect
        .findOne({ where: { siteId: siteId } })
        .then((result) => {
          let data = result.dataValues;
          return res.status(200).json({
            success: true,
            site: { name: data.name, email: data.email, phone: data.phone },
          });
        })
        .catch((err) => {
          console.log(err);
        });

      // your code goes here
    } catch (e) {
      next(e);
    }
  },
  getContactById: (req, res, next) => {
    // Route: /sites/:siteId/contacts/:contactId
    // Params: siteId: int contactId: int
    try {
      let siteId = parseInt(req.params.siteId);
      let contactId = parseInt(req.params.contactId);
      sideContect
        .findOne({ where: { siteId: siteId, locationId: contactId } })
        .then((result) => {
          let data = result.dataValues;
          return res.status(200).json({
            success: true,
            site: { name: data.name, email: data.email, phone: data.phone },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (e) {
      next(e);
    }
  },
  addContacts: (req, res, next) => {
    const data = req.body;
    sideContect
      .findOrCreate({
        where: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          siteId: req.params.siteId,
        },
      })
      .then((instant) => {
        let result = instant[0].dataValues;
        // console.log(created);
        let isCreate = instant[0].isNewRecord;
        if (isCreate) {
          res.json({
            success: true,
            site: result,
          });
        } else {
          res.json({
            success: true,
            site: { isNewRecord: isCreate },
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json("internal");
      });
    try {
    } catch (e) {}
  },
  updateContact: (req, res, next) => {
    try {
      let siteId = req.params.siteId;
      let contactId = req.params.contactId;
      let data = req.body;
      sideContect
        .update({ data, where: { siteId: siteId, locationId: contactId } })
        .then((updateRows) => {
          if (updateRows > 1) {
            sideContect
              .findOne({ where: { siteId: siteId, locationId: contactId } })
              .then((result) => {
                let data = result.dataValues;
                return res.status(200).json({
                  success: true,
                  site: {
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                  },
                });
              })
              .catch((err) => {
                return next(err);
              });
          } else {
            return res.status(200).json({
              success: true,
              site: {
                isUpdated: false,
              },
            });
          }
        });
    } catch (e) {
      next(e);
    }
  },
  deleteContact: (req, res, next) => {
    try {
      let siteId = req.params.siteId;
      let contactId = req.params.contactId;
      SiteContact.findOne({ where: { siteId: siteId, locationId: contactId } })
        .then(async (result) => {
          if (result) {
            await result.destroy();
            return res.status(200).json({
              success: true,
              site: { isDeleted: true },
            });
          } else {
            return res.status(200).json({
              success: true,
              site: { isDeleted: true },
            });
          }
        })
        .catch((err) => {
          next(err);
        });
    } catch (e) {
      next(e);
    }
  },
};

module.exports = SitesController;
