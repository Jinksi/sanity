const cors = require('micro-cors')()

const { buffer, text, json } = require('micro')
const createDOMPurify = require('dompurify')
const { JSDOM } = require('jsdom')

const window = (new JSDOM('')).window
const DOMPurify = createDOMPurify(window)

const handler = async (req, res) => {
  const buf = await buffer(req)
  const str = await text(req)
  const clean = DOMPurify.sanitize(str)
  return clean
}

module.exports = cors(handler)
