import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        open: true,//启动项目自动弹出浏览器
        host:'10.16.28.110',
        port: 3000,//启动端口
        proxy: {
            '/api': {
                // target: 'https://api.kkiik.com',	//实际请求地址
                target:'https://13bkqlg3ie73udv2u5ya.xiangxiangapps.com',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api_service/, '')
            }
        }
    },
})

