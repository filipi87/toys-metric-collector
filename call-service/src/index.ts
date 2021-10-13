import { config } from '../config/config'
import AppService from './app'
import express from 'express'

const startSwaggerDocs = (app:any) => {
    if (process.env.NODE_ENV === 'dev') {
        const swaggerUi = require('swagger-ui-express');
        const YAML = require('yamljs');
        const swaggerDocument = YAML.load('./docs/openapi.yml');
        app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }
}

const overrideConfigByEnvironmentVariables = () => {
  config.daily.apiKey = process.env.DAILY_API_KEY || config.daily.apiKey
}

const deployClientInterface = (app:any) => {
  app.use('/', express.static('../web-client/build', {
      index: 'index.html'
  }))
  app.use('*', express.static('../web-client/build', {
      index: 'index.html'
  }))
}

const main = async () => {
    overrideConfigByEnvironmentVariables()
    const appService = new AppService(config)
    startSwaggerDocs(appService.getApp())
    deployClientInterface(appService.getApp())
    appService.getApp().listen(config.port, () => {
        console.log(`Server started on port ${config.port}`)
    })
}

main()