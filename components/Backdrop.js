// Fixed decorative layers: scroll progress bar, loading screen, glow orbs,
// WebGL canvas and the custom cursor. All animated by <Effects />.
export default function Backdrop() {
  return (
    <>
      <div id="bar" />
      <div id="ld" aria-hidden="true">
        <div>
          <b id="lc">0</b>
          <i>
            <span id="lb" />
          </i>
        </div>
      </div>
      <div className="bg" aria-hidden="true">
        <div className="orb o1" />
        <div className="orb o2" />
      </div>
      <canvas id="gl" aria-hidden="true" />
      <div className="cur" id="cur" />
      <div className="curg" id="curg" />
    </>
  );
}
