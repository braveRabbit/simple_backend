const Customer = require("./Customer")
const Location = require("./Location")
const Site = require('./Site.js')
const SiteContact = require("./SiteContact")

Customer.hasMany(Site, {
    foreignKey: 'customerId'
})
Site.belongsTo(Customer, {
    foreignKey: 'customerId'
})
Location.hasOne(Site, {
    foreignKey: 'locationId'
})
Site.belongsTo(Location, {
    foreignKey: 'locationId'
})

Site.hasMany(SiteContact, {
	foreignKey: 'siteId'
})
SiteContact.belongsTo(Site, {
	foreignKey: 'siteId'
})

Location.hasOne(SiteContact, {
	foreignKey: 'locationId'
})
SiteContact.belongsTo(Location, {
	foreignKey: 'locationId' 
})