import http from "./index";
import {HomeList} from "../types";

const homeRecommendUrl = '/index?_t=1657775445000&device=iPhone12%2C8%2015.5%201.0&s_device_id=F62E31D2-5623-412A-A5A7-0BCC788A01C6&s_os_version=15.5&s_platform=ios HTTP/1.1'
const videoUrl = '/vod/reqplay/54091?_t=1657776786000&device=iPhone12%2C8%2015.5%201.0&s_device_id=F62E31D2-5623-412A-A5A7-0BCC788A01C6&s_os_version=15.5&s_platform=ios&vodid=54091 HTTP/1.1'
const comments = '/comment/listing-53580-0-1?_t=1657776786000&device=iPhone12%2C8%2015.5%201.0&s_device_id=F62E31D2-5623-412A-A5A7-0BCC788A01C6&s_os_version=15.5&s_platform=ios HTTP/1.1'

export const a=90

//首页推荐
export function getHomeRecommendList() {
    return http.get<HomeList>(homeRecommendUrl).then(data => {
       return data
    })
}

export function getLikeRows(){
    return http.get('/getLikeRows?_t=1657784238000&device=iPhone12%2C8%2015.5%201.0&s_device_id=F62E31D2-5623-412A-A5A7-0BCC788A01C6&s_os_version=15.5&s_platform=ios HTTP/1.1').then(res => {

    })
}

//播放信息  retcode = 5  没有权限   retcode: 0 可以
export function getVideoInfo(videoId: number) {
    return http.get('/vod/reqplay/' + videoId + '?_t=1657776786000&device=iPhone12%2C8%2015.5%201.0&s_device_id=F62E31D2-5623-412A-A5A7-0BCC788A01C6&s_os_version=15.5&s_platform=ios&vodid=' + videoId + ' HTTP/1.1').then(res => {
        console.log(res)
    })
}

//评论信息
export function getVideoComments(videoId: number) {
    return http.get('/comment/listing-' + videoId + '-0-1?_t=1657776786000&device=iPhone12%2C8%2015.5%201.0&s_device_id=F62E31D2-5623-412A-A5A7-0BCC788A01C6&s_os_version=15.5&s_platform=ios HTTP/1.1').then(res => {
        console.log(res)
    })
}

//根据当前视频推荐的视频
export function getVideoLike(videoId: number) {
    return http.get('/vod/show/' + videoId + '?_t=1657776786000&device=iPhone12%2C8%2015.5%201.0&s_device_id=F62E31D2-5623-412A-A5A7-0BCC788A01C6&s_os_version=15.5&s_platform=ios&vodid=' + videoId + ' HTTP/1.1').then(res => {
        console.log(res)
    })
}


//频道
export function getChannels() {
    return http.get('/special/listing-0-0-1?_t=1657780941000&device=iPhone12%2C8%2015.5%201.0&s_device_id=F62E31D2-5623-412A-A5A7-0BCC788A01C6&s_os_version=15.5&s_platform=ios HTTP/1.1').then(res => {
        console.log(res)
    })
}
export function getSpecialDetail(spid:number){
    return http.get('/special/detail/'+spid+'?_t=1657782116000&device=iPhone12%2C8%2015.5%201.0&s_device_id=F62E31D2-5623-412A-A5A7-0BCC788A01C6&s_os_version=15.5&s_platform=ios HTTP/1.1').then(res => {
        console.log(res)
    })
}


//分类
//// "$cateid:0-$areaid:0-$yearid:0-$definition:0-$duration:0-$freetype:0-$mosaic:0-$langvoice:0-$orderby:0-$page:1"
export function getCats(){
    return http.get('/vod/listing-0-0-0-0-0-0-0-0-0-1?_t=1657783283000&device=iPhone12%2C8%2015.5%201.0&s_device_id=F62E31D2-5623-412A-A5A7-0BCC788A01C6&s_os_version=15.5&s_platform=ios HTTP/1.1').then(res => {
        console.log(res)
    })
}

getHomeRecommendList()