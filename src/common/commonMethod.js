import success from '../assets/picture/logo.png'
import fail from '../assets/picture/test.jpg'
export default {
  successSubmit () {
    let h = this.$createElement
    this.$msgbox({
      message: h('p', null, [
        h('div', {
          style: {
            backgroundImage: 'url(' + success + ')',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '50px',
            height: '50px'
          }
        }),
        h('div', null, '已上传成功')
      ]),
      confirmButtonText: '确定'
      // beforeClose: (action, instance, done) => {
      //   done()
      // }
    })
  },
  failSubmit () {
    const h = this.$createElement
    this.$msgbox({
      message: h('p', null, [
        h('div', {
          style: {
            backgroundImage: 'url(' + fail + ')',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '50px',
            height: '50px'
          }
        }),
        h('div', null, '已上传成功')
      ]),
      confirmButtonText: '确定'
      // beforeClose: (action, instance, done) => {
      //   done()
      // }
    })
  }
}
