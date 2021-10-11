import { config } from '../config/config'
import AppService from './app'

const startSwaggerDocs = (app:any) => {
    if (process.env.NODE_ENV === 'dev') {
        const swaggerUi = require('swagger-ui-express');
        const YAML = require('yamljs');
        const swaggerDocument = YAML.load('./docs/openapi.yml');
        app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }
}

const main = async () => {

    const appService = new AppService(config)
    startSwaggerDocs(appService.getApp())
    appService.getApp().listen(config.port, () => {
        console.log(`Server started on port ${config.port}`)
    })
}

main()