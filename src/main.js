const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  {
    logo: "A",
    url: "https://www.acfun.cn",
  },
];
// 简化url
const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www", "")
    .replace(/\/.*/, ""); //删除/开头的内容
};
// 渲染页面
const render = () => {
  $siteList.find("li:not(.last)").remove();

  // 节点插到dom树中;
  hashMap.forEach((node, index) => {
    // 永远在新增节点的前面添加新li
    const $newLi = $(`
    <li class="site">
          <div class="siteImage">${node.logo}</div>
          <div class="siteText">${simplifyUrl(node.url)}</div>
          <div class="delete">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-delete"></use>
            </svg>
          </div>
        </li>
    `);

    $newLi.insertBefore($lastLi);

    // 点击li节点，在新打开的窗口中加载输入的网址
    $newLi.on("click", () => {
      window.open(node.url);
    });

    // 给删除按钮添加删除事件
    $newLi.on("click", ".delete", (e) => {
      e.stopPropagation(); // 阻止冒泡
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();

//新增站点：输入名称+网址，添加到哈希数组中
$(".addSite").on("click", () => {
  let url = window.prompt("请问你要添加的网址是：");

  //给内容加http://
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url,
  });

  render(); //加到哈希组里后，再渲染一次页面
});

//reload或者close页面时，数据被记住，不会更改
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};
