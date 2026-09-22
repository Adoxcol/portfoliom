import { defaultPreferences, type Preferences } from "../lib/desktop";
const wallpapers = [
  { id: "teal", name: "Classic teal" },
  { id: "clouds", name: "Cloud nine" },
  { id: "grid", name: "Graph paper" },
  { id: "midnight", name: "After hours" },
] as const;
export default function DisplayProperties({
  value,
  onChange,
  saved,
}: {
  value: Preferences;
  onChange: (prefs: Preferences) => void;
  saved: boolean;
}) {
  return (
    <div className="window-content display-properties">
      <h2>Display Properties</h2>
      <p className="intro">A little more you. Changes apply immediately.</p>
      <div className={`wallpaper-preview wallpaper-${value.wallpaper}`}>
        <div
          style={{
            background: { navy: "#123579", forest: "#2c5a42", plum: "#67436c" }[
              value.accent
            ],
          }}
        >
          mahmood OS
        </div>
      </div>
      <fieldset>
        <legend>Desktop wallpaper</legend>
        <div className="wallpaper-options">
          {wallpapers.map((item) => (
            <label key={item.id}>
              <input
                type="radio"
                name="wallpaper"
                value={item.id}
                checked={value.wallpaper === item.id}
                onChange={() => onChange({ ...value, wallpaper: item.id })}
              />
              <span className={`wallpaper-swatch wallpaper-${item.id}`} />
              {item.name}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>Window accent</legend>
        <div className="accent-options">
          {(["navy", "forest", "plum"] as const).map((accent) => (
            <label key={accent}>
              <input
                type="radio"
                name="accent"
                checked={value.accent === accent}
                onChange={() => onChange({ ...value, accent })}
              />
              <span
                style={{
                  background: {
                    navy: "#123579",
                    forest: "#2c5a42",
                    plum: "#67436c",
                  }[accent],
                }}
              />
              {accent}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="crt-slider">
        CRT intensity <output>{value.crt}%</output>
        <input
          aria-label="CRT intensity"
          type="range"
          min="0"
          max="100"
          value={value.crt}
          onChange={(event) =>
            onChange({ ...value, crt: Number(event.target.value) })
          }
        />
        <small>Set to 0 for a clear screen without scanlines.</small>
      </label>
      <label className="dark-option">
        <input
          type="checkbox"
          checked={value.dark}
          onChange={(event) =>
            onChange({ ...value, dark: event.target.checked })
          }
        />{" "}
        Dark app interiors
      </label>
      <div className="settings-footer">
        <button
          className="secondary-button"
          onClick={() => onChange({ ...defaultPreferences })}
        >
          Restore defaults
        </button>
        <span role="status">
          {saved
            ? "Saved on this device"
            : "Changes apply for this visit; browser storage is unavailable."}
        </span>
      </div>
    </div>
  );
}
