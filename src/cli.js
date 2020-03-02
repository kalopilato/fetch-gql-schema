import chalk from 'chalk'
import validUrl from 'valid-url'
import isValidPath from 'is-valid-path'

import introspectApi from './introspectApi'
import generateSchemaString from './generateSchemaString'
import writeFile from './writeFile'
import timer from '../utils/timer'
import { version as appVersion, name } from '../package.json'

const OPTIONATOR = require('optionator')({
  prepend: `Usage: ${name} [options]`,
  append: `Version ${appVersion}`,
  options: [{
    option: 'help',
    alias: 'h',
    type: 'Boolean',
    description: 'displays help',
    example: `${name} --help`
  }, {
    option: 'url',
    alias: 'u',
    type: 'String',
    description: 'the absolute URL of your GraphQL API introspection endpoint',
    example: `${name} --url http://your.api.host/graphql`
  }, {
    option: 'output',
    alias: 'o',
    type: 'String',
    description: 'the path to the output file',
    example: `${name} --output ../output/schema.graphql`
  }, {
    option: 'version',
    alias: 'v',
    type: 'Boolean',
    description: 'displays the version number',
    example: `${name} --version`
  }]
})

function cli (args) {
  const { help, version, url, output = './schema.graphql' } = OPTIONATOR.parse(args)

  if (help) return console.log(OPTIONATOR.generateHelp())
  if (version) return console.log(`${name} version: ${appVersion}`)

  const errors = []
  if (!url) errors.push('Missing required option: \'url\'')
  if (!validUrl.isUri(url)) errors.push(`Invalid option: 'url'. Must be a valid URL. Received: ${url}`)
  if (output && !isValidPath(output)) errors.push(`Invalid option: 'output'. Must be a valid file path. Received: ${output}`)
  if (errors.length) return console.error(chalk.red(errors.join('\n')))

  timer.start()

  console.log(chalk.cyan(`Introspecting ${url} ...`))
  introspectApi(url)
    .then(introspectionResult => {
      console.log(chalk.cyan('Generating schema string ...'))
      const schemaString = generateSchemaString(introspectionResult)

      console.log(chalk.cyan(`Writing result to ${output} ...`))
      writeFile(schemaString, output)

      timer.stop()
      console.log(chalk.green(`Success! Completed in ${timer.elapsed().toFixed(2)} seconds`))
    })
    .catch(err => console.error(chalk.red(err)))
}

export { cli }
