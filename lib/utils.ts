import { Camera, Color, Layer, LayerType, PathLayer, Point, Side, XYWH } from "@/types/canvas";
import { type ClassValue, clsx } from "clsx"
import React from "react";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



const COLORS = ['#e5e7eb', '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#10b981', '#06b6d4', '#0369a1', '#075985', '#0c4a6e', '#047857'];


export const connectionIdToColor = (connectionId: number):string => {
  return COLORS[connectionId % COLORS.length];
}



export function pointerEventToCanvasPoint (e: React.PointerEvent, camera: Camera) {
  return {
    x: Math.round((e.clientX - camera.x) ),
    y: Math.round((e.clientY - camera.y) ),
  }

}



export function colorToCss(color: Color) {
  return `#${color.r.toString(16).padStart(2, "0")}${color.g.toString(16).padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`;
}

export function resizeBounds(bounds: XYWH, corner: Side, point: Point): XYWH {
  const result = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
  };


  if((corner & Side.Left) === Side.Left) {
    result.x = Math.min(point.x , bounds.x + bounds.width);

    result.width = Math.abs(bounds.x + bounds.width - point.x);
  }

  if((corner & Side.Right) === Side.Right) {
    result.x = Math.min(point.x, bounds.x);
    result.width = Math.abs(point.x - bounds.x);
  }


  if((corner & Side.Top) === Side.Top) {
    result.y = Math.min(point.y, bounds.y + bounds.height);
    result.height = Math.abs(bounds.y + bounds.height - point.y);
  }


  if((corner & Side.Bottom) === Side.Bottom) {
    result.y = Math.min(point.y, bounds.y);
    result.height = Math.abs(point.y - bounds.y);
  }

  return result;
}


export function findIntersectingLayersWithRectangle (layerIds: readonly string[], layers: ReadonlyMap<string, Layer>, a: Point, b: Point ) {
  const rectangle = {
    x: Math.min(a.x, b.x),
    y: Math.min(a.y, b.y),

    width: Math.abs(a.x - b.x),
    height: Math.abs(a.y - b.y),
  }

  const ids = [];

  for (const layerId of layerIds) {
    const layer = layers.get(layerId);
    if (layer === null) {
      continue;
    }

    const { x, y, width, height } = layer as Layer;

    if(rectangle.x + rectangle.width > x && rectangle.x < x + width && rectangle.y + rectangle.height > y && rectangle.y < y + height ) {
      ids.push(layerId);
    }

  }

  return ids;

}



export function getContrastingTextColor  (color: Color) {
  const luminance = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b


  return luminance > 182 ? "#000000" : "#ffffff"

}


export function penPointsToPathLayer(
  points: number[][],
  color: Color,
): PathLayer {
  if (points.length < 2) {
    throw new Error("Cannot transform points with less than 2 points");
  }

  let left = Number.POSITIVE_INFINITY;
  let top = Number.POSITIVE_INFINITY;
  let right = Number.NEGATIVE_INFINITY;
  let bottom = Number.NEGATIVE_INFINITY;

  for (const point of points) {
    const [x, y] = point;

    if (left > x) {
      left = x;
    }

    if (top > y) {
      top = y;
    }

    if (right < x) {
      right = x;
    }

    if (bottom < y) {
      bottom = y;
    }
  }

  return {
    type: LayerType.Path,
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
    fill: color,
    points: points
      .map(([x, y, pressure]) => [x - left, y - top, pressure]),
  };
};


export function getSvgPathFromStroke(stroke: number[][]) {
  if (!stroke.length) return "";

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"]
  );

  d.push("Z");
  return d.join(" ");
};