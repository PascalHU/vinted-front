import "./MinMaxPrice.css";
import { Range, getTrackBackground } from "react-range";

const MinMaxPrice = ({ values, setMinMaxValues }) => {
  const STEP = 1;
  const MIN = 0;
  const MAX = 500;
  return (
    <div className="price-min-max">
      <span>Prix entre : </span>
      <div className="min-max-track">
        <Range
          values={values}
          step={STEP}
          min={MIN}
          max={MAX}
          onChange={(values) => setMinMaxValues(values)}
          renderTrack={({ props, children }) => (
            <div
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: "36px",
                display: "flex",
                width: "100%",
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "5px",
                  width: "100%",
                  borderRadius: "4px",
                  background: getTrackBackground({
                    values,
                    colors: ["#ccc", "#09aeb6", "#ccc"],
                    min: MIN,
                    max: MAX,
                  }),
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ index, props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "20px",
                width: "20px",
                borderRadius: "90px",
                backgroundColor: "#09aeb6",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "2px solid white",
              }}
            >
              <div className="display-value">{values[index]} €</div>
            </div>
          )}
        />
      </div>
    </div>
  );
};
export default MinMaxPrice;
