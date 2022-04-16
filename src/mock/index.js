// 引入mockjs
import Mock from 'mockjs'

const random = Mock.Random

const translateUrl = function (url) {
    let arr = url.split("?")[1].split("&"); //先通过？分解得到？后面的所需字符串，再将其通过&分解开存放在数组里
    let obj = {};
    for (let i of arr) {
        obj[i.split("=")[0]] = i.split("=")[1]; //对数组每项用=分解开，=前为对象属性名，=后为属性值
    }
    return obj;
};


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
    Total: '@natural(60, 100)',
    HasPay: '@natural(60, 100)',
    NeedPay: '@natural(60, 100)',
    InPay: '@natural(60, 100)',
    PayCome: random.string(),
    Balance: '@natural(60, 100)',
}

// 拦截ajax请求，配置mock的数据
Mock.mock(/\/api\/list/, 'get', (req) => {
    const { pageSize } = translateUrl(req.url);
    const List = []
    for (let i = 0; i < pageSize; i++) {
        List.push(Mock.mock(dataTmp))
    }
    const data = {
        List,
        TotalCount: 45
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
