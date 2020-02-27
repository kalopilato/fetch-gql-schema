import chalk from 'chalk'
import clear from 'clear'
import figlet from 'figlet'
import validUrl from 'valid-url'
import isValidPath from 'is-valid-path'

import introspect from './introspect'
import generateSchemaString from './generateSchemaString'
import writeFile from './writeFile'
import timer from '../utils/timer'
import { version, name } from '../package.json'

const OPTIONATOR = require('optionator')({
  prepend: `Usage: ${name} [options]`,
  append: `Version ${version}`,
  options: [{
    option: 'help',
    alias: 'h',
    type: 'Boolean',
    description: 'displays help'
  }, {
    option: 'url',
    alias: 'u',
    type: 'String',
    description: 'the absolute URL of your GraphQL API introspection endpoint',
    example: 'cmd --host http://your.api.host/graphql'
  }, {
    option: 'output',
    alias: 'o',
    type: 'String',
    description: 'the path to the output file',
    example: 'cmd --output ../output/schema.graphql'
  }]
})

function cli (args) {
  clear()

  console.log(
    chalk.magenta(
      figlet.textSync('Schemamatica', { horizontalLayout: 'full' })
    )
  )

  const options = OPTIONATOR.parse(args)
  if (options.help) {
    console.log(OPTIONATOR.generateHelp() + '\n')
    return
  }
  const { url, output } = options
  if (!url) {
    console.error(chalk.red('Missing required option: \'url\'\n'))
    return
  }
  if (!validUrl.isUri(url)) {
    console.error(chalk.red(`Invalid option: 'url'. Must be a valid URL. Received: ${url}\n`))
    return
  }
  if (output && !isValidPath(output)) {
    console.error(chalk.red(`Invalid option: 'output'. Must be a valid file path. Received: ${output}\n`))
    return
  }

  const outputPath = output || './schema.graphql'

  timer.start()

  console.log(chalk.cyan(`Introspecting ${url} ...`))
  introspect(url)
    .then(introspectionResult => {
      console.log(chalk.cyan('Generating schema string ...'))
      const schemaString = generateSchemaString(introspectionResult)

      console.log(chalk.cyan(`Writing result to ${outputPath} ...`))
      writeFile(schemaString, outputPath)

      timer.stop()
      console.log(chalk.green(`\nSuccess! Completed in ${timer.elapsed().toFixed(2)} seconds\n`))
    })
}

export { cli }
