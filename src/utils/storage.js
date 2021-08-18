// localStorage存储数据
export const setStorage = (name, data) => {
    if (!name) return
    if (!typeof data === 'string') {
        data = JSON.stringify (data)
    }
    window.localStorage.setItem(name, data)
}

// localStorage获取数据
export const getStorage = name => {
    if (!name) return
    return window.localStorage.getItem (name)
}

// localStorage删除数组
export const removeStorage = name => {
    if (!name) return
    return window.localStorage.removeItem (name)
}