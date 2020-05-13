import Mock from 'mockjs'
import { uuid } from '@/utils'

Mock.setup({
  timeout: 1000,
})

Mock.mock(/^\/api\/xxxx\/xxxxx\/xxxxx$/, ({ url, type, body }) => {
  console.log(`'${url}' by '${type}'\t\tparams is:${body}`)
  return {
    CodeMsg: '',
    Content: (() => {
      return new Array(10).fill(1).map((item, index) => {
        return {
          id: uuid(8),
        }
      })
    })(),
    Result: 0,
    ResultMessage: '',
  }
})
