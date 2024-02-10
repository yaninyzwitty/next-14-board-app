import {useStorage} from "@/liveblocks.config";
import {LayerType} from "@/types/canvas";
import {memo} from "react";
import Text from "./text";
import Rectangle from "./rectangle";
import Ellipse from "./ellipse";
import Note from "./note";
import Path from "./path";
import {colorToCss} from "@/lib/utils";
type Props = {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
};
export const LayerPreview = memo(
  ({id, onLayerPointerDown, selectionColor}: Props) => {
    const layer = useStorage((root) => root.layers.get(id));

    if (!layer) return;

    switch (layer.type) {
      case LayerType.Rectangle:
        return (
          <Rectangle
            id={id}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
            layer={layer}
          />
        );

      case LayerType.Ellipse:
        return (
          <Ellipse
            id={id}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
            layer={layer}
          />
        );

      case LayerType.Text:
        return (
          <Text
            id={id}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
            layer={layer}
          />
        );

      case LayerType.Note:
        return (
          <Note
            id={id}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
            layer={layer}
          />
        );
      case LayerType.Path:
        return (
          <Path
            key={id}
            points={layer.points}
            onPointerDown={(e) => onLayerPointerDown(e, id)}
            x={layer.x}
            y={layer.y}
            fill={layer.fill ? colorToCss(layer.fill) : "#000"}
            stroke={selectionColor}
          />
        );
      default:
        console.warn("Unknown Layer type");
        return null;
    }
  }
);

LayerPreview.displayName = "LayerPreview";
