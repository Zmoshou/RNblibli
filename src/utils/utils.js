import md5 from "react-native-md5";
import moment from 'moment';

//得到sign的方法
get_sign = (params, key) => {
    var s_keys = [];
    for (var i in params) {
        s_keys.push(i);
    }
    s_keys.sort();
    var data = "";
    for (var i = 0; i < s_keys.length; i++) {
        // encodeURIComponent 返回的转义数字必须为大写( 如 %2F )
        data += (data ? "&" : "") + s_keys[i] + "=" + encodeURIComponent(params[s_keys[i]]);
    }
    return {
        "sign": md5.hex_md5(data + key),
        "params": data
    };
}

//获取视频详情参数
export const getVideoDetilUrl = (aid) => {
    let paramsObj = {
        // aid: "78126101",
        aid: aid,
        appkey: "1d8b6e7d45233436",
        build: "5480400",
        ts: new Date().getTime()
    }
    let appserct = "560c52ccd288fed045859ed18bffd973";
    let signObj = get_sign(paramsObj, appserct);
    console.log(signObj);
    let path = "https://app.bilibili.com/x/v2/view";
    let data = signObj.params;
    let sign = signObj.sign;
    let url = `${path}?${data}&sign=${sign}`;
    return url;
}

//获取视频播放参数 视频解析
export const getVideoPlayerUrl = (cid, qn = 64) => {
    let appserctV2 = "aHRmhWMLkdeMuILqORnYZocwMBpMEOdt";

    let vedioParamsObjV2 = {
        appkey: "iVGUTjsxvpLeuDCf",
        build: "500001",
        buvid: "C0928256-085D-4722-A38F-2E343710C8B3155817infoc",
        cid: cid,
        device: "android",
        otype: "json",
        platform: "android",
        qn: qn
    }
    let vedioSignObjV2 = get_sign(vedioParamsObjV2, appserctV2);
    let vedioPathV2 = "https://app.bilibili.com/playurl";
    let vedioV2Data = vedioSignObjV2.params;
    let vedioV2Sign = vedioSignObjV2.sign;
    let vedioV2Url = `${vedioPathV2}?${vedioV2Data}&sign=${vedioV2Sign}`;
    return vedioV2Url;
}

2389407

// 数字格式化
export const numFormat = (num, mode = 0) => {
    let formatNum = '';
    if (mode === 0) {
        formatNum = num >= 10000 ? (num / 10000).toFixed(1) + '万' : num
    }
    return formatNum;
}

//文字格式化
export const strFormat = (str, num) => {
    if (str.length > num) {
        let newStr = str.slice(0, num)
        return newStr + '...'
    }
    return str
}

//交换两个数组元素位置
export const changeArrIndex = (arr, index1, index2) => {
    let array = JSON.parse(JSON.stringify(arr));
    array.splice(index2, 1, ...array.splice(index1, 1, array[index2]));
    return array;
}

//日期格式化 待写...
export const dataFormat = (data, mode = 0) => {
    let formatData = null;
    let now = new Date().getTime();
    if (mode === 0) {
        // formatData = moment(now - data).format('hh')
        formatData = now - data;
        console.log(formatData);
    }
    return formatData;
}

//时间格式化 1000 
export const timeFormat = (time, num) => {
    var m = Math.floor(time / 60);
    var s = Math.floor(time % 60);

    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    return (m + ':' + s)
}
