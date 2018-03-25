/**
 * Created by bagjeongtae on 2018. 2. 23..
 */
import axios from 'axios'

async function getHangangTemp() {
    let hangangUrl = 'http://localhost:3000/api/v1.0/utils/hangang'
    let hangangData = await axios.get(hangangUrl)
    return parseFloat(JSON.parse(hangangData.data)['temp'])
}

export default getHangangTemp