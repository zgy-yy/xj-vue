export interface VideoInfo {
    actor_tags: Array<{ tagid: number, tagtype: number, tagname: string, itemcount: number }>
    areaid: number
    areaname: string
    author: string
    authorid: number
    cateid: number
    catename: string
    commentcount: number
    coverpic: string //img
    createtime: string
    definition: number
    down_url: string
    downcount_total: number
    downlist: []
    downnum: number
    duration: string
    episode_status: number
    episode_total: number
    exclusive: 0
    intro: string
    islimit: number
    islimitv3: number
    isvip: number
    limit_free: 0
    mosaic: number
    play_url: string
    playcount_total: 4
    playindex: 0
    playlist: []
    portrait: string
    scorenum: string
    tags: Array<{ tagid: number, tagtype: number, tagname: string, itemcount: number }>
    title: string
    updatetime: string
    upnum: number
    view_price: number
    vodid: number
    vodkey: string
    yearid: number
    yearname: number
}

//播放页信息
export interface PlayInfo {

    encurl: number
    httpurl: string
    httpurls: Array<{ hdtype: string, httpurl: string }>
    isfavorite: number
    iszan: number
    xxx_api_auth: string

}

export interface CommentsInfo {

    pageinfo: PlayInfo
    rows: Array<{
        addtime: string
        avatar_url: string
        content: string
        depth: number
        downnum: number
        gender: 2
        gicon: string
        id: number
        isvip: 0
        lft: number
        nickname: number
        parentid: number
        rgt: number
        rootid: number
        sid: number
        subrows: []
        uid: number
        upnum: number
        username: number
        vodid: number
        __closenum__: number
    }>
    xxx_api_auth: string

}

export interface VideoLike {

    categories: {
        cateid: number, catename: string, itemcount: number | null
    }
    likerows: Array<VideoInfo>
    similarrows: VideoInfo[]
    vodrow: VideoInfo
    errmsg: string

}

//演员
export interface Actor {
    addtime: string
    age: number
    avatar: string
    coverpic: string
    cup: number
    downnum: number
    intro: string
    itemcount: number
    spid: number
    spname: string
    sptype: number
    updatetime: string
    upnum: number
    vodrows?: VideoInfo[]
}

export interface PageInfo {
    curr_url: string
    end: number
    first_url: string
    last_url: string
    next: number
    next_url: string
    page: number
    page_url: string
    pages: number[]
    pagesize: number
    plist: { pos: string, page: number, text: number, url: string }
    prev: number
    prev_url: string
    start: number
    total: number
    totalpage: number
}

//频道页

export interface ChannelList {

    actorrows: Array<Actor>
    pageinfo: PageInfo
    params: {
        orderby: number
        page: number
        sptype: number
    }
    rows: Array<Actor>
    sample_params: "$sptype:0-$orderby:0-$page:1"

}

export interface SpecialDetail {
    row: Actor
    vodrows: Array<VideoInfo>
}

interface KV {
    keyid: 1,
    value: '免费'
}

export interface Cat {
    action: string
    areas: Array<{ areaid: number, areaname: string, sortnum: number }>
    categories: Array<{ cateid: number, parentid: number, uuid: '', catename: string }>
    definitions: Array<KV>
    durations: Array<KV>
    freetypes: Array<KV>
    langvoices: Array<KV>
    mosaics: Array<KV>
    now: 1657782614
    orders: Array<KV>
    pageinfo: PageInfo
    params: {
        areaid: number
        cateid: number
        definition: number
        duration: number
        freetype: number
        langvoice: number
        mosaic: number
        orderby: number
        page: number
        yearid: number
    }
    // "$cateid:0-$areaid:0-$yearid:0-$definition:0-$duration:0-$freetype:0-$mosaic:0-$langvoice:0-$orderby:0-$page:1"
    sample_params: string
    vodrows: Array<VideoInfo>
    years: Array<{ yearid: number, yearname: number, sortnum: number }>
}


export interface HomeList {
    a_vodrows: VideoInfo[] //自
    b_vodrows: VideoInfo[] //动
    c_vodrows: VideoInfo[] //经典
    d_vodrows: VideoInfo[] //字幕
    dayrows: VideoInfo[] //头条
    hotrows: VideoInfo[] //热门
    latestrows: VideoInfo[]//最新
    likerows: VideoInfo[] //猜你
    mbsliderows: VideoInfo[]
    pcsliderows: VideoInfo[]
    sliderows: VideoInfo[]
    tagvodrows: VideoInfo[] //流
    v2sliderows: Slide[] // 图
}

export interface Slide{
    pic: string
    scene: string
    spid: number
    title: string
}