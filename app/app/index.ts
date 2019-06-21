import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import * as templates from "./templates.ts";

document.body.innerHTML = templates.main();

const mainElement = document.body.querySelector(".mains");
const alertElement = document.body.querySelector(".alerts");

// 获取全部数据
const getAllData = async () => {
  //  fetch 是异步请求
  const esRes = await fetch("/es/books/book/_search");
  const esResBody = await esRes.json();

  return esResBody.hits.hits.map(item => ({
    id: item._source.id,
    name: item._source.name,
    organizer: item._source.organizer
  }));
};

//渲染数据列表
const showTable = datas => {
  mainElement.innerHTML = templates.showTable({ datas });
};

// 路由
const showView = async () => {
  const [view, ...params] = window.location.hash.split("/");
  switch (view) {
    case "#welcome":
      mainElement.innerHTML = templates.welcome();
      break;
    case "#list":
      const datas = getAllData();
      showTable(datas);
      break;
    default:
      throw Error(`Unrecognized view: ${view}`);
  }
};
// 第一次进入页面时不会触发hashchange事件
window.addEventListener("hashchange", showView);

// 通过showView异步函数触发Error,捕获异常实现hash跳转
showView().catch(err => (window.location.hash = "#welcome"));
