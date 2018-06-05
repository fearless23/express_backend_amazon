var express = require('express');
var router = express.Router();
var details = require('./details')
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true })

const { OperationHelper } = require('apac');

const opHelper = new OperationHelper({
  awsId: details.AWSAccessKeyId,
  awsSecret: details.awsSecret,
  assocId: details.associateTag,
  locale: 'IN',
  maxRequestsPerSecond: 1
});

router.get('/:category/:keyword', (req, res, next) => {
  console.log('Request')
  opHelper.execute('ItemSearch', {
    'SearchIndex': req.params.category,
    'Keywords': req.params.keyword,
    'ResponseGroup': 'ItemAttributes,Offers, Images'
  }).then((response) => {
    console.log('inside response')
    const finalData = response.result.ItemSearchResponse.Items
    res.json({data: finalData})
    console.log('Response has been Sent')
  }).catch((err) => {
    console.error("Something went wrong! ", err);
  });
})
module.exports = router;
