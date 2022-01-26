import defaultParserInterface from '../utils/defaultParserInterface'

const ID = 'cue'

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: '0.4.1',
  homepage: 'https://cuelang.org/',
  _ignoredProperties: new Set(['_type']),
  locationProps: new Set(['Loc']),

  async loadParser(callback) {
    require(['astexplorer-cue'], async parser => {
      await parser.init()
      callback(parser)
    })
  },

  parse(parser, code) {
    return parser.parseFile(code)
  },

  getNodeName(node) {
    return node._type
  },

  nodeToRange(node) {
    if (node.Loc) {
      return [node.Loc.Start, node.Loc.End].map(({ Offset }) => Offset)
    }
  },
}
