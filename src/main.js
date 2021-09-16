const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  {
    logo: "A",
    name: "追番的",
    url: "https://www.acfun.cn",
  },
];

// 渲染页面
const render = () => {
  $siteList.find("li:not(.last)").remove();

  // 节点插到dom树中;
  hashMap.forEach((node, index) => {
    // 永远在新增节点的前面添加新li
    const $newLi = $(`
    <li class="site">
          <div class="siteImage">${node.logo}</div>
          <div class="siteText">${node.name}</div>
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

//点+号显示box
$(".addSite").on("click", () => {
  $(".box").css("display", "block"); //显示box
});
// 点‘取消’按钮 隐藏box
$(".cancelButton").on("click", () => {
  $(".box").css("display", "none");
});

//新增站点：输入名称+网址，添加到哈希数组中
//这里应该是点+号 输入完后点确定 实现新增站点
$(".addButton").on("click", () => {
  //获取box 名称、网址input的内容 通过input的id获取
  let $name = $("#name").val();
  let $url = $("#address").val();
  //给内容加http://
  // if ($url.indexOf("http") !== 0) {
  //   $url = "http://" + $url;
  // }
  hashMap.push({
    logo: $name.substring(0, 1),
    name: $name,
    url: $url,
  });

  render(); //加到哈希组里后，再渲染一次页面
});

//reload或者close页面时，数据被记住，不会更改
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};
