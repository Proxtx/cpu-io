import { createCanvas } from "canvas";
import osUtils from "os-utils";

const canvas = createCanvas(300, 300);
const ctx = canvas.getContext("2d");
let cpuCheckPoints = [];

export class Info {
  name = "Monitor";

  info() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#ffffff";
    ctx.beginPath();
    for (let checkPoint in cpuCheckPoints) {
      ctx.lineTo(
        (300 / cpuCheckPoints.length) * checkPoint,
        300 - cpuCheckPoints[checkPoint] * 3
      );
    }

    ctx.stroke();

    return {
      element: "title-box-io",
      title: "CPU",
      contains: {
        element: "image-io",
        src: canvas.toDataURL(),
      },
    };
  }
}

const cpuLoop = async () => {
  let usage = Math.floor(
    (await new Promise((resolve) => osUtils.cpuUsage(resolve))) * 100
  );

  cpuCheckPoints.push(usage);
  if (cpuCheckPoints.length > 200) cpuCheckPoints.shift();

  setTimeout(() => cpuLoop(), 20000);
};

cpuLoop();
