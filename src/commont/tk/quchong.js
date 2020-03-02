const resolve = require("resolve")

let array = [{
    name: 'carry',
    from: 'beijing'
}, {
    name: 'tom',
    from: 'chendu'
}, {
    name: 'jan',
    from: 'beijing'
}, , {
    name: 'carry',
    from: 'beijing'
}]

async function a(data) {
    console.log('开始')
    await new Promise((resolve,reject)=>{
        console.log(123)
        resolve(22222)
    }).then(res=>{
        console.log(res)
    }).catch(err=>{
        console.log(err)
    })
    await console.log(data + 234)
}
function abc(data) {
    console.log(data)
}
a(123).then(()=>{
    console.log(8888)
})
abc('456')
// function quchong(){
//     const obj = {}
//     array.forEach(res=>{
//         obj[JSON.stringify(res)] = res
//     })
//     array = Object.keys(obj).map(res=>{
//         return JSON.parse(res)
//     })
//     console.log(array)
// }
// quchong()
// function quchong(data) {
//     let obj = {}
//     const result = data.reduce((item, res) => {
//         obj[res.name] ? '' : obj[res.name] = true && item.push(res)
//         return item
//     }, [])
//     console.log(result)
//     return result
// }
// quchong([{ name: 1, id: 13 }, { name: 2, id: 15 }, { name: 1, id: 14 }])
// function N(x) {
//     return x.toUpperCase()
// }
// function v(x) {
//     return x + '!'
// }
// function compose(...x) {
//     return (...info) => {
//         let l2 = info
//         x.forEach((item) => {
//             l2 = item(l2)
//         })
//         return l2
//     }
// }
// const cout = compose(v,N)
// cout('aacc')
// console.log(cout('aacc'))