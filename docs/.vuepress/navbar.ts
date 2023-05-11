
import { create_navbar_md } from './utils'
import { Problems_navbar_Setting, Interview_navbar_Setting, Notes_navbar_Setting, Utils_navbar_Setting } from './utils/constant'


export default [
    create_navbar_md(Notes_navbar_Setting, 'Notes', '笔记查询'),
    create_navbar_md(Problems_navbar_Setting, 'Problems', '问题记录'),
    create_navbar_md(Interview_navbar_Setting, 'Interview', '面经'),
    create_navbar_md(Utils_navbar_Setting, 'Utils', '不错的工具'),
]

