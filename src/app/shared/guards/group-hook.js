export default function (hookList) {
    return function (to, from, next) {
        if (hookList && hookList.length >= 0) {
            for (var i = 0; i < hookList.length; i++) {
                const redirect = hookList[i](to, from)
                if (redirect) return next(redirect)
            }
        }
        next()
    }
}
