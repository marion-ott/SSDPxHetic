import React from 'react'

const Filters = () => (
  <aside style={{ flex: "0 0 20%", height: 'fit-content', borderRadius: 6 }} className="card">
    <div>
      <div style={{ padding: "0.75rem 1.5rem 0.75rem 1.5rem", borderTopLeftRadius: 6, borderTopRightRadius: 6 }} className="card">
        <p style={{ marginBottom: 7 }}>
          <strong>Chercher ...</strong>
        </p>
        <div class="field">
          <div class="control">
            <input class="input is-info" type="text" placeholder="Secteur, criticité ..." />
          </div>
        </div>
      </div>
      <div style={{ padding: "0.75rem 1.5rem 1.5rem 1.5rem" }}>
        <ul style={{ marginBottom: 14 }}>
          <li>
            <p style={{ marginBottom: 7 }}>
              <strong>Secteurs</strong>
            </p>
            <ul class="menu-list control">
              {["Tous", "92 / 93", "93", "77 / 91", "75", "78 / 95"].map((sect) => {
                return (
                  <>
                    <li>
                      <label style={{ height: 43 }} class="radio panel-block">
                        <input type="radio" name="sector" />
                        <div style={{ marginLeft: "0.75em" }}>{sect}</div>
                      </label>
                    </li>
                    <div style={{ height: 1, backgroundColor: "#F3F3F3" }}></div>
                  </>
                )
              })}
            </ul>
          </li>
        </ul>
        <ul>
          <li>
            <p style={{ marginBottom: 7 }}>
              <strong>Taux de criticité</strong>
            </p>
            <ul class="menu-list control">
              {["Tous", "0 - 20", "15 - 30", "25 - 50", "50 - 75"].map((sect) => {
                return (
                  <>
                    <li>
                      <label style={{ height: 43 }} class="radio panel-block">
                        <input type="radio" name="sector" />
                        <div style={{ marginLeft: "0.75em" }}>{sect}</div>
                      </label>
                    </li>
                    <div style={{ height: 1, backgroundColor: "#F3F3F3" }}></div>
                  </>
                )
              })}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </aside>
)

export default Filters
