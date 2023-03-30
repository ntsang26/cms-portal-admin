import { config } from "services"

const CustomBlocksFunc = {
  PromotionsCarousel: (editor, props) => {
    const { meta, type, title, blockId, content, media } = props
    const script = function (props) {
      const { url, css, itemPerSlide, defaultInfo, carouselContainer, carouselItem, activeCarouselInner, carouselInner } = props.meta
      const intDivisionUpper = (a, b) => {
        const surplus = a % b
        const quotient = (a - surplus) / b
        return surplus ? quotient + 1 : quotient
      }
      fetch(url)
        .then((rs) => rs.json())
        .then((rs) => {
          if (rs.errorCode) return null
          let locationPathName = window.location.pathname
          let pathName = locationPathName.split('/').join("")
          let arr = rs.data
          let carouselContainerElement = carouselContainer
          //convert array image
          for (let i = 0;i < arr.length;i++) {
            let element = carouselItem.replace(/{{image}}/g, arr[i].image)
            element = element.replace(/{{name}}/g, arr[i].name)
            element = element.replace(/{{link}}/, encodeURI(`./${pathName}/voucherInfo/${arr[i].sid}` || "#"))
            element = element.replace(/{{infomation}}/g, arr[i].infomation?.en || "")
            arr[i] = element
          }
          const countSlide = intDivisionUpper(arr.length, itemPerSlide)

          let listSlide = []
          for (let slideIndex = 0;slideIndex < countSlide;slideIndex++) {
            let listInnerElement = arr.splice(0, itemPerSlide)
            const slide = (!slideIndex ? activeCarouselInner : carouselInner).replace(/{{innerElement}}/g, listInnerElement.join(""))
            listSlide.push(slide)
          }

          carouselContainerElement = carouselContainerElement.replace(/{{carouselInner}}/g, listSlide.join(""))
          const element = `${carouselContainerElement}<style> ${css}  </style>`
          this.innerHTML = element
        })
    }

    editor.Components.addType(type, {
      model: {
        defaults: {
          script, meta,
          'script-props': ['meta'],
        },
      },
    })
    editor.Blocks.add(blockId, {
      label: title,
      category: 'Script',
      media,
      content
    })
  },
  PromotionsDetailCarousel: (editor, props) => {
    const { meta, type, title, blockId, content, media } = props
    const script = function (props) {
      const { url, css, itemPerSlide, defaultInfo, carouselContainer, carouselItem, activeCarouselInner, carouselInner } = props.meta
      const intDivisionUpper = (a, b) => {
        const surplus = a % b
        const quotient = (a - surplus) / b
        return surplus ? quotient + 1 : quotient
      }
      fetch(url)
        .then((rs) => rs.json())
        .then((rs) => {
          if (rs.errorCode) return null
          let arr = rs.data
          let carouselContainerElement = carouselContainer
          //convert array image
          for (let i = 0;i < arr.length;i++) {
            let element = carouselItem.replace(/{{image}}/g, arr[i].image)
            element = element.replace(/{{name}}/g, arr[i].name)
            element = element.replace(/{{link}}/, encodeURI(`./${arr[i].sid}` || "#"))
            element = element.replace(/{{infomation}}/g, arr[i].infomation?.en || "")
            arr[i] = element
          }
          const countSlide = intDivisionUpper(arr.length, itemPerSlide)

          let listSlide = []
          for (let slideIndex = 0;slideIndex < countSlide;slideIndex++) {
            let listInnerElement = arr.splice(0, itemPerSlide)
            const slide = (!slideIndex ? activeCarouselInner : carouselInner).replace(/{{innerElement}}/g, listInnerElement.join(""))
            listSlide.push(slide)
          }

          carouselContainerElement = carouselContainerElement.replace(/{{carouselInner}}/g, listSlide.join(""))
          const element = `${carouselContainerElement}<style> ${css}  </style>`
          this.innerHTML = element
        })
    }

    editor.Components.addType(type, {
      model: {
        defaults: {
          script, meta,
          'script-props': ['meta'],
        },
      },
    })
    editor.Blocks.add(blockId, {
      label: title,
      category: 'Script',
      media,
      content
    })
  },
  VoucherList: (editor, props) => {
    const { meta, type, title, content, media, styles } = props
    const script = function (props) {
      const { voucherItemUi, categoryItemUi, promotionUrl, categoryUrl, loadingComponent, defaultInfo } = props.meta
      fetch(categoryUrl)
        .then(rs => rs.json())
        .then((rs) => {
          if (rs.errorCode) return null
          var childNodes = this.childNodes
          var categoryNode = childNodes[0]
          var promotionNode = childNodes[1]
          var categoryNodeStr = `<li class="nav-item category-item active"><a class="category-link">All</a></li>`
          function disableActiveTab() {
            var categoryItemNode = categoryNode.childNodes
            for (let i = 0;i < categoryItemNode.length;i++) {
              if (categoryItemNode[i].className.includes("active")) {
                categoryItemNode[i].classList.remove("active")
              }
            }
          }
          function getPromotion(params = "") {
            promotionNode.innerHTML = loadingComponent
            fetch(promotionUrl + params).then((rsp) => rsp.json())
              .then((rsp) => {
                if (rsp.errorCode) return null
                var promotionNodeStr = ''
                for (let i = 0;i < rsp.data.length;i++) {
                  var element = rsp.data[i];
                  var strNode = voucherItemUi.replace(/{{name}}/, element.name)
                  strNode = strNode.replace(/{{image}}/, element.image)
                  strNode = strNode.replace(/{{link}}/, encodeURI(`./voucherInfo/${element.sid}` || "#"))
                  strNode = strNode.replace(/{{infomation}}/, element.infomation?.en || "")
                  promotionNodeStr += strNode
                }
                promotionNode.innerHTML = promotionNodeStr
              })
          }
          //
          for (let i = 0;i < rs.data.length;i++) {
            var element = rs.data[i];
            var strNode = categoryItemUi.replace(/{{name}}/, element.name)
            categoryNodeStr += strNode
          }
          categoryNode.innerHTML = categoryNodeStr
          var categoryItemNode = categoryNode.childNodes
          for (let i = 0;i < categoryItemNode.length;i++) {
            if (!i) {
              categoryItemNode[i].addEventListener("click", () => {
                if (!categoryItemNode[i].className.includes("active")) {
                  disableActiveTab()
                  categoryItemNode[i].classList.add("active")
                  getPromotion()
                }
              })
            }
            else {
              categoryItemNode[i].addEventListener("click", () => {
                if (!categoryItemNode[i].className.includes("active")) {
                  disableActiveTab()
                  categoryItemNode[i].classList.add("active")
                  getPromotion(`?categoryId=${rs.data[i - 1].sid}`)
                }
              })
            }
          }
          getPromotion()
        })
    }

    editor.DomComponents.addType(type, {
      isComponent: (el) => el?.className?.includes("voucher-list"),
      model: {
        defaults: {
          script,
          meta,
          'script-props': ["meta"]
        }
      }
    })

    // A block for the custom component
    editor.BlockManager.add(type, {
      label: title,
      content: content + styles,
      media,
      category: "Script"
    });
  },
  RecentPromotion: (editor, props) => {
    const { meta, type, title, blockId, content, media } = props
    const script = function (props) {
      const { url, css, itemPerSlide, carouselContainer, carouselItem, activeCarouselInner, carouselInner } = props.meta
      const intDivisionUpper = (a, b) => {
        const surplus = a % b
        const quotient = (a - surplus) / b
        return surplus ? quotient + 1 : quotient
      }

      if (navigator.geolocation) {
        const successCallback = (position) => {
          let { longitude, latitude } = position.coords
          fetch(url + `&lat=${latitude}&long=${longitude}`)
            .then((rs) => rs.json())
            .then((rs) => {
              if (rs.errorCode) return null
              let arr = rs.data
              if (arr.length == 0) {
                return this.innerHTML = `<p class="text-center text-danger">There are no promotions recently</p>`;
              } else {
                let carouselContainerElement = carouselContainer
                //convert array image
                for (let i = 0;i < arr.length;i++) {
                  let element = carouselItem.replace(/{{image}}/g, arr[i].promotion.image)
                  element = element.replace(/{{name}}/g, arr[i].promotion.name)
                  element = element.replace(/{{link}}/, encodeURI(`./voucherInfo/${arr[i].promotion.sid}` || "#"))
                  element = element.replace(/{{infomation}}/g, arr[i].infomation?.en || "")
                  element = element.replace(/{{address}}/g, arr[i].address || "")
                  element = element.replace(/{{distance}}/g, arr[i].distance || "")
                  arr[i] = element
                }
                const countSlide = intDivisionUpper(arr.length, itemPerSlide)

                let listSlide = []
                for (let slideIndex = 0;slideIndex < countSlide;slideIndex++) {
                  let listInnerElement = arr.splice(0, itemPerSlide)
                  const slide = (!slideIndex ? activeCarouselInner : carouselInner).replace(/{{innerElement}}/g, listInnerElement.join(""))
                  listSlide.push(slide)
                }

                carouselContainerElement = carouselContainerElement.replace(/{{carouselInner}}/g, listSlide.join(""))
                const element = `${carouselContainerElement}<style> ${css}  </style>`
                this.innerHTML = element
              }
            })
        }
        const errorCallback = (error) => {
          console.log(error);
          return this.innerHTML = `<p class="text-danger text-center">${error.message}</p>`
        }
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
      } else {
        return this.innerHTML = null
      }
    }

    editor.Components.addType(type, {
      model: {
        defaults: {
          script, meta,
          'script-props': ['meta'],
        },
      },
    })
    editor.Blocks.add(blockId, {
      label: title,
      category: 'Script',
      media,
      content
    })
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (editor) => {
  for (const item of CUSTOM_BLOCKS) {
    CustomBlocksFunc[item.func](editor, item)
  }
}

const CUSTOM_BLOCKS = [
  {
    func: 'PromotionsCarousel',
    title: 'Promotions Carousel 3/2',
    type: 'promotions-carousel',
    media: '<i class="bi bi-code-slash"></i>',
    blockId: 'promotions-carousel-block',
    meta: {
      url: config.HOST + '/integation/loylatyPromotion?limit=12&skip=0',
      defaultInfo: 'Voucher to buy Golden Lotus Tea size M is only 1,000 VND, applicable when buying any order from 50,000 VND or more.',
      carouselContainer: `
        <div id="promotionCarousel" data-bs-ride="carousel" class="carousel slide">
          <div class="carousel-inner">
          {{carouselInner}}
          </div>
          <button type="button" data-bs-target="#promotionCarousel" data-bs-slide="prev" class="carousel-control carousel-control-prev">
            <i aria-hidden="true" class="bi bi-caret-left-fill"></i>
            <span class="visually-hidden">Previous</span>
          </button>
          <button type="button" data-bs-target="#promotionCarousel" data-bs-slide="next" class="carousel-control carousel-control-next">
            <i aria-hidden="true" class="bi bi-caret-right-fill"></i>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      `,
      carouselItem: `<a class="col-lg-4 py-2 px-3 voucher-item" href="{{link}}">
        <img class="rounded" src="{{image}}" />
        <p class="voucher-title text-center">{{name}}</p>
        <p class="voucher-subs">
          {{infomation}}
        </p>
      </a>`,
      activeCarouselInner: `<div class="carousel-item active"><div class="carousel-item__voucher">{{innerElement}}</div></div>`,
      carouselInner: `<div class="carousel-item"><div class="carousel-item__voucher">{{innerElement}}</div></div>`,
      css: `
      .col-lg-4.py-2.px-1.voucher-item{
        display:flex;
        flex-direction:column;
        justify-content:center;
        width:32%;
      }
    
      .carousel-control {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin: auto 0;
        background-color: rgb(168, 240, 168);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .carousel-control i {
      font-size: 40px;
    }

    .carousel-control-prev {
      left: -8%;
  }
    .carousel-control-next {
      right: -8%;
  }

      .carousel-item__voucher {
        display: flex;
        flex-wrap: wrap;
        row-gap: 10px;
        column-gap: 10px;
        justify-content: center;
      }

      .voucher-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 32%;
        text-decoration: none;
        color: black;
      }
  
      .voucher-item:hover {
        color: black;
      }  

      .voucher-title {
        margin: 10px 0;
        text-align: left;
        font-weight: 600;
        font-size: 16px;
      }
  
      .voucher-subs {
        text-align: left;
        font-size: 14px;
        font-weight: 500;
        color: rgb(64, 64, 64);
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      `,
      itemPerSlide: 6
    },
    content: `
    <style>
      .img{
        width: 312px;
        height: 181px;
        margin: 0 auto;
        background: #d9d9d9;
        position: relative;
        overflow: hidden;
      }
      .name {
        height: 15px;
        width: 55%;
        background: #d9d9d9;
        position: relative;
        overflow: hidden;
        border-radius: 10px;
        margin: 10px auto;
      }
      .img::before,
      .name::before{
        position: absolute;
        content: "";
        height: 100%;
        width: 100%;
        background-image: linear-gradient(to right, #d9d9d9 0%, rgba(0,0,0,0.07) 20%, #d9d9d9 40%, #d9d9d9 100%);
        background-repeat: no-repeat;
        background-size: 450px 400px;
        animation: shimmer 1s linear infinite;
      }
      .img::before{
        background-size: 650px 600px;
      }
      @keyframes shimmer {
        0%{
          background-position: -450px 0;
        }
        100%{
          background-position: 450px 0;
        }
      }
      </style>
        <div data-gjs-type="promotions-carousel">
          <div class="row">
            <div class="col col-xxl-4 mb-3">
              <div class="img"></div>
              <div class="name"></div>
            </div>
            <div class="col col-xxl-4">
              <div class="img"></div>
              <div class="name"></div>
            </div>
            <div class="col col-xxl-4">
              <div class="img"></div>
              <div class="name"></div>
            </div>
            <div class="col col-xxl-4">
              <div class="img"></div>
              <div class="name"></div>
            </div>
            <div class="col col-xxl-4">
              <div class="img"></div>
              <div class="name"></div>
            </div>
            <div class="col col-xxl-4">
              <div class="img"></div>
              <div class="name"></div>
            </div>
          </div>
        </div>
      `
    ,
  },
  {
    func: 'PromotionsDetailCarousel',
    title: 'Promotions Carousel 3/1',
    type: 'promotions-detail-carousel',
    media: '<i class="bi bi-code-slash"></i>',
    blockId: 'promotions-detail-carousel-block',
    meta: {
      url: config.HOST + '/integation/loylatyPromotion?limit=12&skip=0',
      defaultInfo: 'Voucher to buy Golden Lotus Tea size M is only 1,000 VND, applicable when buying any order from 50,000 VND or more.',
      carouselContainer: `
      <div id="promotionDetailCarousel" data-bs-ride="carousel" class="carousel slide">
        <div class="carousel-inner">
        {{carouselInner}}
        </div>
        <button type="button" data-bs-target="#promotionDetailCarousel" data-bs-slide="prev" class="carousel-control carousel-control-prev">
          <i aria-hidden="true" class="bi bi-caret-left-fill"></i>
          <span class="visually-hidden">Previous</span>
        </button>
        <button type="button" data-bs-target="#promotionDetailCarousel" data-bs-slide="next" class="carousel-control carousel-control-next">
          <i aria-hidden="true" class="bi bi-caret-right-fill"></i>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      `,
      carouselItem: `<a class="col-lg-4 py-2 px-3 voucher-item" href="{{link}}">
      <img class="rounded" src="{{image}}" />
      <p class="voucher-title text-center">{{name}}</p>
      <p class="voucher-subs">
        {{infomation}}
      </p>
    </a>`,
      activeCarouselInner: `<div class="carousel-item active"><div class="carousel-item__voucher">{{innerElement}}</div></div>`,
      carouselInner: `<div class="carousel-item"><div class="carousel-item__voucher">{{innerElement}}</div></div>`,
      css: `
      .col-lg-4.py-2.px-1.voucher-item{
        display:flex;
        flex-direction:column;
        justify-content:center;
        width:32%;
      }
    
      .carousel-control {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin: auto 0;
        background-color: rgb(168, 240, 168);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .carousel-control i {
      font-size: 40px;
    }

    .carousel-control-prev {
      left: -8%;
  }
    .carousel-control-next {
      right: -8%;
  }

      .carousel-item__voucher {
        display: flex;
        flex-wrap: wrap;
        row-gap: 10px;
        column-gap: 10px;
        justify-content: center;
      }

      .voucher-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 32%;
        text-decoration: none;
        color: black;
      }
  
      .voucher-item:hover {
        color: black;
      }     

      .voucher-title {
        margin: 10px 0;
        text-align: left;
        font-weight: 600;
        font-size: 16px;
      }
  
      .voucher-subs {
        text-align: left;
        font-size: 14px;
        font-weight: 500;
        color: rgb(64, 64, 64);
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    `,
      itemPerSlide: 3
    },
    content: `
    <style>
    .img{
      height: 190px;
      margin: 0 auto;
      background: #d9d9d9;
      position: relative;
      overflow: hidden;
    }
    .name {
      height: 15px;
      width: 55%;
      background: #d9d9d9;
      position: relative;
      overflow: hidden;
      border-radius: 10px;
      margin: 10px auto;
    }
    .recent{
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }
    .recent span{
      display: block;
      background: #d9d9d9;
      border-radius: 10px;
      overflow: hidden;
      position: relative;
    }
    .recent .address{
      height: 15px;
      width: 100px;
    }
    .recent .distance{
      height: 15px;
      width: 50px;
    }
    
    .img::before,
    .recent span::before,
    .name::before{
      position: absolute;
      content: "";
      height: 100%;
      width: 100%;
      background-image: linear-gradient(to right, #d9d9d9 0%, rgba(0,0,0,0.07) 20%, #d9d9d9 40%, #d9d9d9 100%);
      background-repeat: no-repeat;
      background-size: 450px 400px;
      animation: shimmer 1s linear infinite;
    }
    .img::before{
      background-size: 650px 600px;
    }
    .recent span::before{
      animation-delay: 0.2s;
    }
    @keyframes shimmer {
      0%{
        background-position: -450px 0;
      }
      100%{
        background-position: 450px 0;
      }
    }
    </style>
    <div data-gjs-type="promotions-detail-carousel">
      <div class="row gap-5">
        <div class="col">
          <div class="img"></div>
          <div class="name"></div>
          <div class="recent">
            <span class="address"></span>
            <span class="distance"></span>
          </div>
        </div>
        <div class="col">
          <div class="img"></div>
          <div class="name"></div>
          <div class="recent">
            <span class="address"></span>
            <span class="distance"></span>
          </div>
        </div>
        <div class="col">
          <div class="img"></div>
          <div class="name"></div>
          <div class="recent">
            <span class="address"></span>
            <span class="distance"></span>
          </div>
        </div>
      </div>
    </div>
      `
    ,
  },
  {
    func: 'VoucherList',
    title: 'Voucher List',
    type: 'voucher-list',
    media: '<i class="bi bi-ticket-perforated"></i>',
    content: `
    <style>
    .img {
      width: 312px;
      height: 181px;
      margin: 0 auto;
      background: #d9d9d9;
      position: relative;
      overflow: hidden;
    }
    
    .name {
      height: 15px;
      width: 55%;
      background: #d9d9d9;
      position: relative;
      overflow: hidden;
      border-radius: 10px;
      margin: 10px auto;
    }

    .img::before,
    .name::before {
      position: absolute;
      content: "";
      height: 100%;
      width: 100%;
      background-image: linear-gradient(
        to right,
        #d9d9d9 0%,
        rgba(0, 0, 0, 0.07) 20%,
        #d9d9d9 40%,
        #d9d9d9 100%
      );
      background-repeat: no-repeat;
      background-size: 450px 400px;
      animation: shimmer 1s linear infinite;
    }
    
    .img::before {
      background-size: 650px 600px;
    }
    
    @keyframes shimmer {
      0% {
        background-position: -450px 0;
      }
    
      100% {
        background-position: 450px 0;
      }
    }
    
    </style>
    <div data-gjs-type="voucher-list" class="voucher-list">
      <ul class="nav category-list">
      </ul>
      <div class="row">
        <div class="col col-xxl-4 mb-3">
          <div class="img"></div>
          <div class="name"></div>
        </div>
        <div class="col col-xxl-4">
          <div class="img"></div>
          <div class="name"></div>
        </div>
        <div class="col col-xxl-4">
          <div class="img"></div>
          <div class="name"></div>
        </div>
        <div class="col col-xxl-4 mb-3">
          <div class="img"></div>
          <div class="name"></div>
        </div>
        <div class="col col-xxl-4">
          <div class="img"></div>
          <div class="name"></div>
        </div>
        <div class="col col-xxl-4">
          <div class="img"></div>
          <div class="name"></div>
        </div>
        <div class="col col-xxl-4">
          <div class="img"></div>
          <div class="name"></div>
        </div>
        <div class="col col-xxl-4">
          <div class="img"></div>
          <div class="name"></div>
        </div>
        <div class="col col-xxl-4">
          <div class="img"></div>
          <div class="name"></div>
        </div>
      </div>
    </div>
    `,
    meta: {
      promotionUrl: config.HOST + '/integation/loylatyPromotion',
      categoryUrl: config.HOST + '/integation/loylatyCategory',
      defaultInfo: 'Voucher to buy Golden Lotus Tea size M is only 1,000 VND, applicable when buying any order from 50,000 VND or more.',
      loadingComponent: `<div class="d-flex align-items-center justify-content-center"><div class="spinner-border text-success m-4 fs-3" role="status"><span class="visually-hidden">Loading...</span></div></div>`,
      voucherItemUi: `<a class="col-lg-4 py-2 px-3 voucher-item" href="{{link}}"><img class="rounded" src="{{image}}" /><p class="voucher-title text-center">{{name}}</p><p class="voucher-subs">{{infomation}}</p></a>`,
      categoryItemUi: `<li class="nav-item category-item"><a class="category-link">{{name}}</a></li>`,
    },
    styles: `
    <style>
      .category-list {
        padding: 20px 0;
        justify-content: space-around;
        align-items: center;
      }

      .category-list .category-item.active {
        background: rgb(76 184 73 / 30%);
        border-radius: 5px;
      }

      .category-list .category-item.active .category-link {
        color: #4CB849;
        font-weight: 600;
      }

      .category-list .category-link {
        text-decoration: none;
        font-size: 15px;
        color: black;
        font-weight: 500;
        transition: all .2s;
        cursor: pointer;
      }

      .category-list .category-link:hover {
        color: #4CB849;
      }

      .category-list .category-item {
        padding: 5px 22px;
        line-height: 22.5px;
      }

      .voucher-list .row {
        min-height: 500px;
      }

      .voucher-list .voucher-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 32%;
        text-decoration: none;
        color: black;
      }
  
      .voucher-list .voucher-item:hover {
        color: black;
      }     
    
      .voucher-list .voucher-title {
        margin: 10px 0;
        text-align: left;
        font-weight: 600;
        font-size: 16px;
      }
  
      .voucher-list .voucher-subs {
        text-align: left;
        font-size: 14px;
        font-weight: 500;
        color: rgb(64, 64, 64);
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      @media (max-width: 800px) {
        .category-list .category-item {
          padding: 5px 15px;
        }
      }

      @media (max-width: 576px) {
        .category-list .category-item {
          padding: 5px 12px;
        }
      }
    </style>
    `
  },
  {
    func: 'RecentPromotion',
    title: 'Recent Promotion',
    type: 'recent-promotion',
    media: '<i class="bi bi-code-slash"></i>',
    blockId: 'recent-promotion-block',
    meta: {
      url: config.HOST + '/integation/loyaltyPromotionNear?limit=12&skip=0',
      defaultInfo: 'Voucher to buy Golden Lotus Tea size M is only 1,000 VND, applicable when buying any order from 50,000 VND or more.',
      carouselContainer: `
      <div id="recentPromotion" data-bs-ride="carousel" class="carousel slide">
        <div class="carousel-inner">
          {{carouselInner}}
        </div>
        <button type="button" data-bs-target="#recentPromotion" data-bs-slide="prev" class="carousel-control carousel-control-prev">
          <i aria-hidden="true" class="bi bi-caret-left-fill"></i>
          <span class="visually-hidden">Previous</span>
        </button>
        <button type="button" data-bs-target="#recentPromotion" data-bs-slide="next" class="carousel-control carousel-control-next">
          <i aria-hidden="true" class="bi bi-caret-right-fill"></i>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      `,
      carouselItem: `
      <a class="col-lg-4 py-2 px-3 voucher-item" href="{{link}}">
        <img class="rounded" src="{{image}}" />
        <p class="voucher-title text-center">{{name}}</p>
        <p class="voucher-subs">
          {{infomation}}
        </p>
        <p class="voucher-recent d-flex justify-content-between">
          <span>{{address}}</span>
          <span>
            <i class="bi bi-geo-alt text-danger"></i>
            {{distance}}
          </span>
        </p>
      </a>
      `,
      activeCarouselInner: `<div class="carousel-item active"><div class="carousel-item__voucher">{{innerElement}}</div></div>`,
      carouselInner: `<div class="carousel-item"><div class="carousel-item__voucher">{{innerElement}}</div></div>`,
      css: `
      .col-lg-4.py-2.px-1.voucher-item{
        display:flex;
        flex-direction:column;
        justify-content:center;
        width:32%;
      }
    
      .carousel-control {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin: auto 0;
        background-color: rgb(168, 240, 168);
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .carousel-control i {
        font-size: 40px;
      }

      .carousel-control-prev {
        left: -8%;
      }
        .carousel-control-next {
          right: -8%;
      }

      .carousel-item__voucher {
        display: flex;
        flex-wrap: wrap;
        row-gap: 10px;
        column-gap: 10px;
        justify-content: center;
      }

      .voucher-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 32%;
        text-decoration: none;
        color: black;
      }
  
      .voucher-item:hover {
        color: black;
      }     

      .voucher-title {
        margin: 10px 0;
        text-align: left;
        font-weight: 600;
        font-size: 16px;
      }
  
      .voucher-subs {
        text-align: left;
        font-size: 14px;
        font-weight: 500;
        color: rgb(64, 64, 64);
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    `,
      itemPerSlide: 3
    },
    content: `
      <style>
      .img{
        height: 190px;
        margin: 0 auto;
        background: #d9d9d9;
        position: relative;
        overflow: hidden;
      }
      .name {
        height: 15px;
        width: 55%;
        background: #d9d9d9;
        position: relative;
        overflow: hidden;
        border-radius: 10px;
        margin: 10px auto;
      }
      .recent{
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
      }
      .recent span{
        display: block;
        background: #d9d9d9;
        border-radius: 10px;
        overflow: hidden;
        position: relative;
      }
      .recent .address{
        height: 15px;
        width: 100px;
      }
      .recent .distance{
        height: 15px;
        width: 50px;
      }
      
      .img::before,
      .recent span::before,
      .name::before{
        position: absolute;
        content: "";
        height: 100%;
        width: 100%;
        background-image: linear-gradient(to right, #d9d9d9 0%, rgba(0,0,0,0.07) 20%, #d9d9d9 40%, #d9d9d9 100%);
        background-repeat: no-repeat;
        background-size: 450px 400px;
        animation: shimmer 1s linear infinite;
      }
      .img::before{
        background-size: 650px 600px;
      }
      .recent span::before{
        animation-delay: 0.2s;
      }
      @keyframes shimmer {
        0%{
          background-position: -450px 0;
        }
        100%{
          background-position: 450px 0;
        }
      }
      </style>
      <div data-gjs-type="recent-promotion">
        <div class="row gap-5">
          <div class="col">
            <div class="img"></div>
            <div class="name"></div>
            <div class="recent">
              <span class="address"></span>
              <span class="distance"></span>
            </div>
          </div>
          <div class="col">
            <div class="img"></div>
            <div class="name"></div>
            <div class="recent">
              <span class="address"></span>
              <span class="distance"></span>
            </div>
          </div>
          <div class="col">
            <div class="img"></div>
            <div class="name"></div>
            <div class="recent">
              <span class="address"></span>
              <span class="distance"></span>
            </div>
          </div>
        </div>
      </div>
      `
    ,
  }
]