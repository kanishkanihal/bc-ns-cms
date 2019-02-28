import React, { Component } from "react";
import "./App.css";

import AppBar from "./components/AppBar";
import AddCMSBlock from "./components/AddCMSBlock";
import CMSBlocks from "./components/CMSBlocks";

class App extends Component {
  state = {
    cmsBlocks: [
      { code: "fgdb111", title: "title1", content: "content1", status: true },
      { code: "fgdb222", title: "title2", content: "content2", status: false },
      { code: "fgdb333", title: "title3", content: "content3", status: true },
      { code: "fgdb444", title: "title4", content: "content4", status: false },
      { code: "fgdb555", title: "title1", content: "content1", status: true },
      { code: "fgdb666", title: "title2", content: "content2", status: false },
      { code: "fgdb777", title: "title3", content: "content3", status: true },
      { code: "fgdb888", title: "title4", content: "content4", status: false }
    ]
  };
  render() {
    return (
      <div className="App">
        <AppBar />
        <div className="cmsContainer">
          <AddCMSBlock />
          <CMSBlocks cmsBlocks={this.state.cmsBlocks} />
        </div>
      </div>
    );
  }
}

export default App;
