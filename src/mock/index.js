// 引入mockjs
import Mock from 'mockjs'

const random = Mock.Random

// 拦截ajax请求，配置mock的数据
Mock.mock(/\/api\/login/, 'post', (req) => {
    const {
        username
    } = JSON.parse(req.body)
    console.log(username)
    return {
        Success: true,
        Data: {
            UserInfo: {
                username,
                img: random.dataImage('200x100')
            },
            Token: random.guid(),
        }
    }
})

const dataTmp = {
    ID: '@increment',
    LastDate: '@datetime',
    Total: '@natural',
    HasPay: '@natural',
    NeedPay: '@natural',
    InPay: '@natural',
    PayCome: random.string(),
    Balance: '@natural',
}

// 拦截ajax请求，配置mock的数据
Mock.mock(/\/api\/list/, 'get', () => {
    console.log(req)
    const {
        pageSize
    } = JSON.parse(req.body)

    const List = []
    for (let i = 0; i < pageSize; i++) {
        List.push(Mock.mock(dataTmp))
    }
    const data = {
        List,
        TotalCount:45
    }
    return {
        Success: true,
        Data: data
    }
})

Mock.mock(/\/api\/info/, 'get', () => {
    const data = Mock.mock(dataTmp)
    return {
        Success: true,
        Data: data
    }
})

console.log('%c前端 mock 环境启动成功', 'color: #38f;font-weight: bold')

export default Mock
