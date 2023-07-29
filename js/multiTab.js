/*
 * @Author: gaiwa gaiwa@163.com
 * @Date: 2023-07-29 17:28:06
 * @LastEditors: gaiwa gaiwa@163.com
 * @LastEditTime: 2023-07-29 21:42:21
 * @FilePath: \html\work\js\day28\multiTab\js\multiTab.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
let data = [
  {
    class: 'active',
    picSrc: './img/1.1.png',
    width: '427',
    height: '320',
    index: '0',
  },
  {
    class: '',
    picSrc: './img/1.2.png',
    width: '427',
    height: '320',
    index: '0',
  },
  {
    class: '',
    picSrc: './img/1.3.png',
    width: '427',
    height: '320',
    index: '0',
  },
  {
    class: '',
    picSrc: './img/1.4.png',
    width: '427',
    height: '320',
    index: '0',
  },
  {
    class: '',
    picSrc: './img/1.5.png',
    width: '427',
    height: '320',
    index: '0',
  },
  {
    class: '',
    picSrc: './img/1.6.png',
    width: '427',
    height: '320',
    index: '0',
  },
  {
    class: 'active',
    picSrc: './img/2.1.png',
    width: '427',
    height: '320',
    index: '1',
  },
  {
    class: '',
    picSrc: './img/2.2.png',
    width: '427',
    height: '320',
    index: '1',
  },
  {
    class: '',
    picSrc: './img/2.3.png',
    width: '427',
    height: '320',
    index: '1',
  },
  {
    class: '',
    picSrc: './img/2.4.png',
    width: '427',
    height: '320',
    index: '1',
  },
  {
    class: '',
    picSrc: './img/2.5.png',
    width: '427',
    height: '320',
    index: '1',
  },
  {
    class: 'active',
    picSrc: './img/3.1.png',
    width: '427',
    height: '320',
    index: '2',
  },
  {
    class: '',
    picSrc: './img/3.2.png',
    width: '427',
    height: '320',
    index: '2',
  },
  {
    class: '',
    picSrc: './img/3.3.png',
    width: '427',
    height: '320',
    index: '2',
  },
  {
    class: '',
    picSrc: './img/3.4.png',
    width: '427',
    height: '320',
    index: '2',
  },
]
let oNav = document.querySelector('.tab-nav');
let aTab = document.querySelectorAll('.tab-nav li');
let oCon = document.querySelector('.content');
let oConSlide = document.querySelector('.content .con-slide');
let oConPic = document.querySelector('.con-pic');
let layerNum = aTab.length;
let slide_index = 0;
let layer_index = 0;
let imgList = getEachLayerNum(data);
let numberSlideType = {
  'mouseover': function(e){
    if(e.target.tagName.toLowerCase() === 'span'){
      changeImg(function(){
        slide_index = e.target.innerHTML - 1;
      });
    }
  },
  'click': function(e){
    if(e.target.tagName.toLowerCase() === 'span'){
      changeImg(function(){
        slide_index = e.target.innerHTML - 1;
      });
    }
  }
}
let numberTabType = {
  'mouseover': function(e){
    if (e.target.tagName.toLowerCase() === 'li'){
      oNav.children[0].children[layer_index].classList.remove('active');
      layer_index = getEleIdx(e.target);
      oNav.children[0].children[layer_index].classList.add('active');
      init(layer_index);
      slide_index = 0;
    }
  },
  'click': function(e){
    if (e.target.tagName.toLowerCase() === 'li'){
      oNav.children[0].children[layer_index].classList.remove('active');
      layer_index = getEleIdx(e.target);
      oNav.children[0].children[layer_index].classList.add('active');
      init(layer_index);
      slide_index = 0;
    }
  },
}
init(0);

function dataFormatting(data,startIdx,endIdx){
  return data.reduce(function(acc, curr, idx){
    if (idx < endIdx && idx>= startIdx){
      acc +=`<img class="${curr.class}" src="${curr.picSrc}" width="${curr.width}" height="${curr.height}" alt="!" data-index="${curr.index}">`;
    }
    return acc;
  },'');
}
// Calculating how many picture in each layer
function getEachLayerNum(data){
  let layerList = data.map(function(item){
    return parseInt(item.index);
  });
  return layerList.reduce(function(acc,curr){
    acc[curr] = (acc[curr]+1) || 1;
    return acc;
  },[]);
}
function getDataIdx(data,layer){
  let cnt = 0;
  for (let i= 0, len = data.length; i<len; i++){
    if (parseInt(data[i].index) !== layer){
      cnt++;
    } else {
      break;
    }
  }
  return cnt;
}
// Initializing
function init(layer){
  oConPic.innerHTML = '';
  oConSlide.innerHTML = '';
  let fragmentSlide = document.createDocumentFragment();
  let prevIdx = getDataIdx(data,layer);
  let vImgDom = dataFormatting(data,prevIdx,prevIdx+imgList[layer]);
  for (let i = 0; i< imgList[layer]; i++){
    let vSpanDom = document.createElement('span');
    vSpanDom.innerHTML = `${i+1}`;
    if (i === 0){
      vSpanDom.classList.add('active');
    }
    fragmentSlide.append(vSpanDom);
  }
  drawHtml(oConPic,vImgDom);
  oConSlide.append(fragmentSlide);
}
function changeImg(callback){
  oConPic.children[slide_index].classList.remove('active');
  oConSlide.children[slide_index].classList.remove('active');
  callback &&callback();
  oConPic.children[slide_index].classList.add('active');
  oConSlide.children[slide_index].classList.add('active');
}
function getEleIdx(ele){
  let elements = ele.parentNode.children;
  for (let i = 0, ele_len = elements.length; i<ele_len; i++){
    if(elements[i] === ele){
      return i;
    }
  }
}
function drawHtml(parent,htmlStr){
  parent.innerHTML += htmlStr;
}
function slideType(e){
  if(numberSlideType[e.type] && typeof numberSlideType[e.type] === 'function'){
    numberSlideType[e.type](e);
  }
}
function tabType(e){
  if(numberTabType[e.type] && typeof numberTabType[e.type] === 'function'){
    numberTabType[e.type](e);
  }
}

oCon.addEventListener('mouseover',slideType,false);
oCon.addEventListener('click',slideType,false);
oNav.addEventListener('mouseover',tabType,false);
oNav.addEventListener('click',tabType,false);