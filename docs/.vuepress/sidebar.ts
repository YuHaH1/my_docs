import { create_sidebar_md } from './utils'
import { Notes_Sidebar_Setting, Interview_Sidebar_Setting, Problems_Sidebar_Setting, Utils_Sidebar_Setting } from './utils/constant'

const Notes_sidebar = create_sidebar_md(Notes_Sidebar_Setting, '/Notes/')
const Interview_sidebar = create_sidebar_md(Interview_Sidebar_Setting, '/Interview/')
const Problems_sidebar = create_sidebar_md(Problems_Sidebar_Setting, '/Problems/')
const Utils_sidebar = create_sidebar_md(Utils_Sidebar_Setting, '/Utils/')
const sidebar_all = [...Notes_sidebar, ...Interview_sidebar, ...Problems_sidebar, ...Utils_sidebar]


const sidebar = {}

for (let value of sidebar_all) {
    const keys = Object.keys(value)
    sidebar[keys[0]] = value[keys[0]]
}


export default {
    ...sidebar,
}

