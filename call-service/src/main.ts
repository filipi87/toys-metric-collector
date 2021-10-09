import { config } from '../config/config'
import AppService from './app'

const main = async () => {

    const appService = new AppService(config)
    appService.getApp().listen(config.port, () => {
        console.log(`Server started on port ${config.port}`)
    })
}

export { main }