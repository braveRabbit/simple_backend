const { param } = require("express-validator")
const Site = require("../models/Site")

const SitesValidations = {
    getSiteById: [
        param('siteId')
            .isInt().withMessage('Site id is required and needs to be an integer')
            .custom(value => {
                return Site.findByPk(value).then(site => {
                    if(!site) {
                        return Promise.reject('Site with that id does not exists')
                    }
                })
            })
    ],
    getContacts: [
        param('siteId')
            .isInt().withMessage('Site id is required and needs to be an integer')
            .custom(value => {
                return Site.findByPk(value).then(site => {
                    if(!site) {
                        return Promise.reject('Site with that id does not exists')
                    }
                })
            })
    ]
}

module.exports = SitesValidations