import { TimeLine, TimeLineInfo, Point } from 'src/types';

function transFormTimeLine(timeLine: TimeLine, devicePixelRatio: number): TimeLineInfo {
  const { position } = timeLine;
  let pointTopLeft: Point = { x: 0, y: 0 };
  let pointBottomRight: Point = { x: 0, y: 0 };
  switch (position) {
    case 'top': {
      pointTopLeft = {
        x: 0,
        y: 0,
      };
      pointBottomRight = {
        x: timeLine.width * devicePixelRatio,
        y: devicePixelRatio * timeLine.size,
      };
      break;
    }
    case 'bottom': {
      pointTopLeft = {
        x: 0,
        y: (timeLine.height - timeLine.size) * devicePixelRatio,
      };
      pointBottomRight = {
        x: timeLine.width * 2,
        y: timeLine.height * 2,
      };
      break;
    }
    case 'left': {
      pointTopLeft = {
        x: 0,
        y: 0,
      };
      pointBottomRight = {
        x: timeLine.size * devicePixelRatio,
        y: devicePixelRatio * timeLine.height,
      };
      break;
    }
    case 'right': {
      pointTopLeft = {
        x: (timeLine.width - timeLine.size) * devicePixelRatio,
        y: 0,
      };
      pointBottomRight = {
        x: timeLine.width * 2,
        y: timeLine.height * 2,
      };
      break;
    }
    default:
      break;
  }
  const points: TimeLineInfo['points'] = {
    topLeft: pointTopLeft,
    bottomRight: pointBottomRight,
    topRight: {
      x: pointTopLeft.x,
      y: pointBottomRight.y,
    },
    bottomLeft: {
      x: pointBottomRight.x,
      y: pointTopLeft.y,
    },
  };
  let totalTime = 0;
  // eslint-disable-next-line no-undefined
  timeLine.videos = timeLine.videos.filter((o) => o.text !== undefined && o.time !== undefined);
  for (let i = 0; i < timeLine.videos.length; i++) {
    if (!timeLine.videos[i].text) {
      continue;
    }
    totalTime = totalTime + timeLine.videos[i].time;
  }
  const finalVideos = [...timeLine.videos];

  return {
    ...timeLine,
    points,
    totalTime,
    videos: timeLine.reverse ? finalVideos.reverse() : finalVideos,
    size: timeLine.size * devicePixelRatio,
    fontSize: timeLine.fontSize * devicePixelRatio,
    width: timeLine.width * devicePixelRatio,
    height: timeLine.height * devicePixelRatio,
    linePadding: timeLine.linePadding * devicePixelRatio,
    lineWidth: timeLine.lineWidth * devicePixelRatio,
  };
}

export { transFormTimeLine };