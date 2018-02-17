module.exports = {
  port: process.env.PORT || 4040,
  db: process.env.MONGODB_URI || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://FrankoCampos:2fa@ds239638.mlab.com:39638/2fa',
  SECRET_TOKEN: 'SECRETtwoFactorAuthySECRET'       
}
/*module.exports = {
  port: process.env.PORT || 4040,
  db: process.env.MONGODB_URI || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://admingolf:golf2112obs@ds111648.mlab.com:11648/ligagolf',
  SECRET_TOKEN: 'SECRETgolfleagueSECRET'       
}*/