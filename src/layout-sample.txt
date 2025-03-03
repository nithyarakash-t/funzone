export function sample() {
  return (
    <>
      {/* Grid */}
      {/* Advantages less HTML tags */}
      {/* Cons need to specify app-fullwidth as an additional class wherever necessary
      , which might go against the BEM coding principles */}
      <div className="app-grid">
        <h1 style={{ fontSize: "2.5rem", fontWeight: "500" }}>
          Grid based layout
        </h1>
      </div>
      <header className="app-grid">
        <p>Sample Header</p>
      </header>
      <main className="app-grid">
        <p>
          Sample Content -- Needs a little optimizing as for some values such as
          --content-maxwidth of 900px, doesnt match with app-container
        </p>
        <p className="app-breakout">
          Breakout -- works on screen width of 1600px and above (due to
          max-width applied)
        </p>
        <p className="app-fullwidth">Fullwidth</p>
      </main>
      <footer className="app-grid">
        <p>Sample Footer</p>
      </footer>

      {/* Container  */}
      <div className="app-wrapper" style={{ marginTop: "2rem" }}>
        <div className="app-container">
          <h1 style={{ fontSize: "2.5rem", fontWeight: "500" }}>
            Container based Layout
          </h1>
        </div>
        <header>
          <div className="app-container">
            <p>Sample Header</p>
          </div>
        </header>
        <main id="app-main">
          <div className="app-container">
            <p>Sample Content</p>
          </div>
          <p>Full width</p>
        </main>
        <footer>
          <div className="app-container">
            <p>Sample Footer</p>
          </div>
        </footer>
      </div>
    </>
  );
}
