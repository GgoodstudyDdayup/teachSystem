function quchong(data) {
    let obj = {}
    const newResult = data.reduce((item, res) => {
        obj[res.name] ? '' : obj[res.name] = true && item.push(res)
        return item
    }, [])
    console.log(newResult)
}
quchong([{ name: 1, id: 13 }, { name: 2, id: 15 }, { name: 1, id: 14 }])