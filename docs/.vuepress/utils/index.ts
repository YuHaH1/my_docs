import fs from 'fs'
import path from 'path'
import { exec } from 'child_process'
import { my_typora_path } from './constant'
const create_navbar_md = (lib_array: Array<string>, dir_name: string, text: string,) => {


    lib_array.forEach(lib => {
        const file_name = lib.split('.')[0]
        // 首字母大写文件夹
        const upStringFileName = file_name[0].toUpperCase() + file_name.substring(1)
        const dir = path.resolve(__dirname, `../../${dir_name}`, upStringFileName)
        // const file = path.resolve(dir, lib)
        // const is_exist = fs.existsSync(file)
        const dir_exist = fs.existsSync(dir)
        // if (!is_exist) {
        //     const framatterString = '---\nlang: zh-CN\ntitle: ' + file_name + '\ndescription: 关键功能\ncollapsible: true\n---'
        if (!dir_exist) {
            fs.mkdir(dir, (err) => {
                if (err) {
                    console.log('创建文件失败', dir)
                }
            })
        }
    })
    const children = lib_array.map(lib => {
        const file_name = lib.split('.')[0]
        const upStringFileName = file_name[0].toUpperCase() + file_name.substring(1)
        const dirs = fs.readdirSync(path.resolve(__dirname, `../../${dir_name}/${upStringFileName}`))
        let md_file = dirs.filter(v => v !== lib)
        md_file = md_file.length > 0 ? md_file[md_file.length - 1] : []
        return {
            text: upStringFileName,
            link: `/${dir_name}/${upStringFileName}/${md_file}`
        }
    })


    const nav_bar = {
        text,
        children
    }
    return nav_bar
}

const create_sidebar_md = (lib_array: Array<Array<string>>, dir_name: string) => {
    const sidebar = lib_array.map(lib => {
        // 子目录名称
        const file_name = lib.shift()!
        const upStringFileName = file_name[0].toUpperCase() + file_name.substring(1)
        // 父级目录+自己目录
        const intergrate_dir_name = dir_name + upStringFileName + '/'
        const sidebar_obj = {}

        lib.forEach(v => {
            const file = path.resolve(__dirname, `../../${intergrate_dir_name + v}`)
            const is_exist = fs.existsSync(file)
            const framatterString = '---\nlang: zh-CN\ntitle: ' + v.split('.')[0] + '\ndescription: 关键功能\ncollapsible: true\n---\n# ' + v.split('.')[0]
            if (!is_exist) {
                try {
                    fs.appendFile(file, framatterString, (err) => {
                        if (err) throw err;
                        console.log('The "data to append" was appended to file!');
                    });
                    exec_typora(file)
                } catch (error) {
                    console.log(error)
                }
            }
        })


        sidebar_obj[intergrate_dir_name] = [
            {
                text: upStringFileName,
                collapsible: true,
                children: lib.map(v => intergrate_dir_name + v)
            }
        ]
        // console.log(sidebar_obj);
        return sidebar_obj
    })
    return sidebar
}

const exec_typora = (md_file) => {
    if (process.env.NODE_ENV === 'production' || !my_typora_path) {
        return
    }
    const typora_path = path.normalize(my_typora_path)
    if (!fs.existsSync(typora_path)) {
        return
    }
    md_file = path.normalize(md_file)
    exec(`${typora_path} ${md_file} `, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
    })
}





export { create_navbar_md, create_sidebar_md }