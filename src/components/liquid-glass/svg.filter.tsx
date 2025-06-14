export function SVGFilterElement({
  distortion,
  radius = 0,
  distance = 0,
  depth = 4,
}: {
  distortion?: number;
  radius?: number;
  distance?: number;
  depth?: number;
}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
      <filter
        id="liquidGlassFilter"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        filterUnits="objectBoundingBox"
        preserveAspectRatio="none"
      >
        <feImage
          href={`data:image/svg+xml;utf8,
            <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
              <rect width='100%' height='100%' fill='black'/>
              <rect
                rx='${radius}'
                ry='${radius}'
                x='${distance}'
                y='${distance}'
                fill='white'
                style='
                  width: calc(100% - ${distance * 2}px);
                  height: calc(100% - ${distance * 2}px);
                '
              />
            </svg>`}
          result="bevelLight"
        />
        <feGaussianBlur
          in="bevelLight"
          stdDeviation={depth}
          result="blurLight"
        />

        <feImage
          href={`data:image/svg+xml;utf8,
            <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
              <rect width='100%' height='100%' fill='black'/>
              <rect 
                rx='${radius}'
                ry='${radius}'
                x='${distance}'
                y='${distance}'
                fill='white'
                style='
                  width: calc(100% - ${distance * 2}px);
                  height: calc(100% - ${distance * 2}px);
                '
              />
            </svg>`}
          result="bevelShadow"
        />
        <feGaussianBlur
          in="bevelShadow"
          stdDeviation={depth}
          result="blurShadow"
        />

        <feMerge result="bevelMap">
          <feMergeNode in="blurLight" />
          <feMergeNode in="blurShadow" />
        </feMerge>

        <feDisplacementMap
          in="SourceGraphic"
          in2="bevelMap"
          scale={distortion}
          xChannelSelector="R"
          yChannelSelector="G"
          result="embossed"
        />

        <feComposite in="embossed" in2="SourceAlpha" operator="in" />
      </filter>
    </svg>
  );
}
