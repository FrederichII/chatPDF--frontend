import * as PDFJS from "/pdf.js";
import pdfjsWorker from "./pdf.worker.js";
PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker;
const pdfUrl = "../pdf.js/test/pdfs/160F-2019.pdf";
console.log(pdfUrl);
PDFJS.getDocument(pdfUrl).promise.then((pdfDoc) => {
    const totalPages = pdfDoc.numPages; // pdf 的总页数
    const pdfContainer = document.getElementById("#pdf_container"); //html中需创建一个相应的div容器，用于存放canvas元素
    for (let i = 1; i <= totalPages; i++) {
        // 第4步：使用 pdfDoc.getPage（i） 获取第 i 页的数据
        pdfDoc.getPage(i).then((page) => {
            let scaledViewport = page.getViewport({ scale: 1.5 }); //可通过scale来调节初始的缩放比
            //第5步：创建一个 canvas 元素，并设置元素的画布属性
            let canvas = document.createElement("canvas");
            canvas.setAttribute("id", "the-canvas" + i);
            canvas.height = scaledViewport.height;
            canvas.width = scaledViewport.width;
            let context = canvas.getContext("2d");
            let renderContext = {
                canvasContext: context,
                viewport: scaledViewport,
            };
            //第 6 步: 使用 page.render 将数据渲染到画布上
            page.render(renderContext).promise.then(() => { });
            canvasContainer.appendChildren(canvas); //将canvas元素加入到容器中
        });
    }
})
