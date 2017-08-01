const cors = require('micro-cors')()

const { buffer, text } = require('micro')
const createDOMPurify = require('dompurify')
const { JSDOM } = require('jsdom')

const window = (new JSDOM('')).window
const DOMPurify = createDOMPurify(window)

const handler = async (req, res) => {
  const buf = await buffer(req)
  const str = await text(req)
  console.log('cleaning')
  const clean = DOMPurify.sanitize(str)
  console.log('returning clean')
  return clean
}

module.exports = cors(handler)
