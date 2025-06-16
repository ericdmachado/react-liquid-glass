import { useEffect, useState, useRef, useCallback } from "react";
import { LiquidGlass } from "./components";
import "./App.css";
import { Range } from "./components/range/range";
import { Move } from "lucide-react";

function App() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const offset = useRef({ x: 0, y: 0 });

  const wallpapers = Array.from({ length: 5 }).map(
    (_, index) => `/0${index + 1}.png`
  );

  const pixelToPercent = (value: number, max: number) => {
    return (value / max) * 100;
  };
  const percentToPixel = (value: number, max: number) => {
    return (value / 100) * max;
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
      offset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      setIsDragging(true);
    }
  };

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      });
    },
    [isDragging]
  );

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const [blur, setBlur] = useState(10);
  const [brightness, setBrightness] = useState(80);
  const [saturation, setSaturation] = useState(150);
  const [boxSize, setBoxSize] = useState(200);
  const [distortion, setDistortion] = useState(100);
  const [borderRadius, setBorderRadius] = useState(100);
  const [distance, setDistance] = useState(4);
  const [depth, setDepth] = useState(4);

  useEffect(() => {
    document.documentElement.style.setProperty("--blur", `${blur}px`);
    document.documentElement.style.setProperty(
      "--brightness",
      `${brightness}%`
    );
    document.documentElement.style.setProperty("--box-size", `${boxSize}px`);
    document.documentElement.style.setProperty(
      "--border-radius",
      `${borderRadius}px`
    );
    document.documentElement.style.setProperty(
      "--saturation",
      `${saturation}%`
    );
    document.documentElement.style.setProperty("--depth", `${depth}px`);
  }, [blur, brightness, boxSize, borderRadius, saturation, depth]);

  useEffect(() => {
    document.addEventListener("pointermove", onMouseMove);
    document.addEventListener("pointerup", onMouseUp);
    return () => {
      document.removeEventListener("pointermove", onMouseMove);
      document.removeEventListener("pointerup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  return (
    <>
      <LiquidGlass
        ref={boxRef}
        onPointerDown={onMouseDown}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          cursor: isDragging ? "grabbing" : "grab",
        }}
        distortion={distortion}
        radius={borderRadius}
        distance={distance}
        depth={depth}
      >
        <div
          style={{
            paddingLeft: "2rem",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            padding: 0,
          }}
        >
          <Move size={30} color="white" />
        </div>
      </LiquidGlass>

      <h1>Liquid Glass</h1>
      <p>Simple effect with html and css, using a svg filter</p>

      <div className="controls">
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "1rem",
            flexDirection: "column",
          }}
          className="inner"
        >
          <fieldset>
            <legend>Blur</legend>
            <Range
              defaultValue={pixelToPercent(blur, 10)}
              onChange={(value) => {
                setBlur(percentToPixel(Number(value), 10));
              }}
            />
          </fieldset>

          <fieldset>
            <legend>Distortion</legend>
            <Range
              defaultValue={pixelToPercent(distortion, 400)}
              onChange={(value) => {
                setDistortion(percentToPixel(Number(value), 400));
              }}
            />
          </fieldset>

          <div style={{ display: "flex", gap: "1rem" }}>
            <fieldset>
              <legend>Distance</legend>
              <Range
                defaultValue={pixelToPercent(distance, 100)}
                onChange={(value) => {
                  setDistance(percentToPixel(Number(value), 100));
                }}
              />
            </fieldset>
            <fieldset>
              <legend>Depth</legend>
              <Range
                defaultValue={pixelToPercent(depth, 10)}
                onChange={(value) => {
                  setDepth(percentToPixel(Number(value), 10));
                }}
              />
            </fieldset>
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <fieldset>
              <legend>Brightness</legend>
              <Range
                defaultValue={pixelToPercent(brightness, 200)}
                onChange={(value) => {
                  setBrightness(percentToPixel(Number(value), 200));
                }}
              />
            </fieldset>

            <fieldset>
              <legend>Saturation</legend>
              <Range
                defaultValue={pixelToPercent(saturation, 200)}
                onChange={(value) => {
                  setSaturation(percentToPixel(Number(value), 200));
                }}
              />
            </fieldset>
          </div>

          <fieldset>
            <legend>BoxSize</legend>
            <Range
              defaultValue={pixelToPercent(boxSize, 400)}
              onChange={(value) => {
                setBoxSize(percentToPixel(Number(value), 400));
              }}
            />
          </fieldset>

          <fieldset>
            <legend>Radius</legend>
            <Range
              defaultValue={pixelToPercent(borderRadius, boxSize / 2)}
              onChange={(value) => {
                setBorderRadius(percentToPixel(Number(value), boxSize / 2));
              }}
            />
          </fieldset>

          <fieldset>
            <legend>Wallpaper</legend>

            <div className="wallpapers">
              {wallpapers.map((wallpaper, index) => (
                <div
                  key={index}
                  className="wallpaper"
                  style={{
                    backgroundImage: `url(${wallpaper})`,
                    backgroundSize: "cover",
                    width: "100%",
                    height: "100px",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    document.documentElement.style.setProperty(
                      "--background-image",
                      `url(${wallpaper})`
                    );
                  }}
                ></div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
      <div className="credits">
        <a
          href="https://github.com/ericdmachado"
          target="_blank"
          rel="noopener noreferrer"
          className="github-profile"
        >
          @ericdmachado
        </a>
        <a
          href="https://github.com/ericdmachado/react-liquid-glass"
          className="github-badge"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            width={16}
            height={16}
            style={{ display: "inline-block", verticalAlign: "middle" }}
          >
            <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878z" />{" "}
          </svg>
          <p>Fork on GitHub</p>
        </a>
      </div>
    </>
  );
}

export default App;
