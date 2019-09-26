import { get, post } from '../http.js'
export default {
  // 上传单条问答
  uploadQA (params) {
    return post('/qa', params)
  },
  // 资源上传  --上传文件
  resource (params, config) {
    return post('/resource', params, config)
  },
  // 获取评论下拉菜单
  commentMenu (params) {
    return get('/api/comment/menu', params)
  },
  // 参数数据导出到excel
  paramExportdata (params) {
    return get('/api/param/exportdata', params)
  },
  // 获取参数数据
  param (params) {
    return get('/api/param', params)
  },
  // 获取参数下拉菜单
  paramMenu (params) {
    return get('/api/param/menu', params)
  },
  // 获取某参数下评论数据
  pcomment (params) {
    return get('/api/pcomment', params)
  },
  // 某参数下评论数据导出到excel
  pcommentExportdata (params) {
    return get('/api/pcomment/exportdata', params)
  }
}
