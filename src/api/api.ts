import http from "./index";
import {Cat, ChannelList, CommentsInfo, HomeList, PlayInfo, SpecialDetail, VideoInfo, VideoLike} from "../types";

const globalData = '/getGlobalData?_t=1657874338000&device=iPhone12%2C8%2015.5%203.8.0&pid=&s_device_id=1CEC992E-B7EE-4BE6-9BBF-E5FFCB77F06A&s_os_version=15.5&s_platform=ios&verno=10000 HTTP/1.1'
const homeRecommendUrl = '/index?_t=1657775445000&device=iPhone12%2C8%2015.5%201.0&s_device_id=F62E31D2-5623-412A-A5A7-0BCC788A01C6&s_os_version=15.5&s_platform=ios HTTP/1.1'
const videoUrl = '/vod/reqplay/54091?_t=1657776786000&device=iPhone12%2C8%2015.5%201.0&s_device_id=F62E31D2-5623-412A-A5A7-0BCC788A01C6&s_os_version=15.5&s_platform=ios&vodid=54091 HTTP/1.1'
const comments = '/comment/listing-53580-0-1?_t=1657776786000&device=iPhone12%2C8%2015.5%201.0&s_device_id=F62E31D2-5623-412A-A5A7-0BCC788A01C6&s_os_version=15.5&s_platform=ios HTTP/1.1'
const recommend = '/vod/recommend-0-0-0-0-0-0-0-0-0-1?_t=1657874342000&device=iPhone12%2C8%2015.5%203.8.0&s_device_id=1CEC992E-B7EE-4BE6-9BBF-E5FFCB77F06A&s_os_version=15.5&s_platform=ios HTTP/1.1'

export function getGlobalData() {
    return http.get<HomeList>(globalData).then(data => {
        console.log(data)
    })
}

export function getRecommend() {
    return http.get<HomeList>(recommend).then(data => {
        console.log(data)
    })
}
//首页推荐
export function getHomeRecommendList() {
    return http.get<HomeList>(homeRecommendUrl).then(data => {
       return data
    })
}

export function getLikeRows(){
    return http.get<{likerows:VideoInfo[]}>('/getLikeRows?_t=1657784238000&device=iPhone12%2C8%2015.5%201.0&s_device_id=F62E31D2-5623-412A-A5A7-0BCC788A01C6&s_os_version=15.5&s_platform=ios HTTP/1.1').then(data => {
        return(data.likerows)
    })
}

//播放信息  retcode = 5  没有权限   retcode: 0 可以
export function getPlayInfo(videoId: string) {
    return http.get<PlayInfo>('/vod/reqplay/' + videoId + '?_t=1657776786000&device=iPhone12%2C8%2015.5%201.0&s_device_id=F62E31D2-5623-412A-A5A7-0BCC788A01C6&s_os_version=15.5&s_platform=ios&vodid=' + videoId + ' HTTP/1.1').then(data => {
        return data
    })
}

//评论信息
export function getVideoComments(videoId: string,start:number,end:number) {
    return http.get<CommentsInfo>('/comment/listing-' + videoId + '-'+start+'-'+end+'?_t=1657776786000&device=iPhone12%2C8%2015.5%201.0&s_device_id=F62E31D2-5623-412A-A5A7-0BCC788A01C6&s_os_version=15.5&s_platform=ios HTTP/1.1').then(data => {
        return data
    })
}

//根据当前视频推荐的视频
export function getVideoLike(videoId: string) {
    return http.get<VideoLike>('/vod/show/' + videoId + '?_t=1657776786000&device=iPhone12%2C8%2015.5%201.0&s_device_id=F62E31D2-5623-412A-A5A7-0BCC788A01C6&s_os_version=15.5&s_platform=ios&vodid=' + videoId + ' HTTP/1.1').then(data => {
       return data
    })
}


//频道
export function getChannels(page:number,sptype=0,orderby=0) {
    return http.get<ChannelList>('/special/listing-'+sptype+'-'+orderby+'-'+page+'?_t=1657780941000&device=iPhone12%2C8%2015.5%201.0&s_device_id=F62E31D2-5623-412A-A5A7-0BCC788A01C6&s_os_version=15.5&s_platform=ios HTTP/1.1').then(data => {
        return data
    })
}
export function getSpecialDetail(spid:number){
    return http.get<SpecialDetail>('/special/detail/'+spid+'?_t=1657782116000&device=iPhone12%2C8%2015.5%201.0&s_device_id=F62E31D2-5623-412A-A5A7-0BCC788A01C6&s_os_version=15.5&s_platform=ios HTTP/1.1').then(data => {
       return data
    })
}


//分类
//// "$cateid:0-$areaid:0-$yearid:0-$definition:0-$duration:0-$freetype:0-$mosaic:0-$langvoice:0-$orderby:0-$page:1"
export function getCats(...args:number[]){
    let param = ''
    for (let i = 0; i < args.length; i++) {
       param+=`-${args[i]}`
    }
    return http.get<Cat>('/vod/listing'+param+'?_t=1657783283000&device=iPhone12%2C8%2015.5%201.0&s_device_id=F62E31D2-5623-412A-A5A7-0BCC788A01C6&s_os_version=15.5&s_platform=ios HTTP/1.1').then(data => {
        return data
    })
}


