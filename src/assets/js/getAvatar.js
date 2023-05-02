
import axios from 'axios';

function getAvatar(avatarList){
    axios({
        url: `http://api.pi1grim.top/ea/api/v3/avatar`,
        method: 'GET',
        headers: {
            token: sessionStorage.getItem('token')
        }
    }).then(res => {
        console.log(res)
        if (res.status === 200) {
            if (res.data.code === 2085) {
                console.log(res.data)
                avatarList = res.data.data  
            }
        }
    })  
}

function setMap(avatarList){
    console.log('kaishi')
    console.log(avatarList)
    const map = new Map()
    avatarList.forEach(item => {
        map.set(item.stuId, item.avatar)
    });
    return map
}

function updataMap(){
    let avatarList = []
    axios({
        url: `http://api.pi1grim.top/ea/api/v3/crawler/avatar`,
        method: 'GET',
        headers: {
            token: sessionStorage.getItem('token')
        }
    }).then(res => {
        console.log(res)
        if (res.status === 200) {
            if (res.data.code === 2075) {
                console.log(res.data)
                avatarList = res.data.data
            }
        }
    })
    const map = new Map()
    avatarList.forEach(item => {
        map.set(item.stuId, item.avatar)
    });
    return map
}

export default { setMap , updataMap ,getAvatar}