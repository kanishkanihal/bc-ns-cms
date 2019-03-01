import React, { Component } from "react";
import "./App.css";

import AppBar from "./components/AppBar";
import AddCMSBlock from "./components/AddCMSBlock";
import CMSBlocks from "./components/CMSBlocks";

class App extends Component {
  state = {
    cmsBlocks: [
      {
        id: 1,
        code: "fgdb111",
        title: "title1",
        content: "content1",
        status: true
      },
      {
        id: 2,
        code: "fgdb222",
        title: "title2",
        content: "content2",
        status: false
      },
      {
        id: 3,
        code: "fgdb333",
        title: "title3",
        content: "content3",
        status: true
      },
      {
        id: 4,
        code: "fgdb444",
        title: "title4",
        content: "content4",
        status: false
      },
      {
        id: 5,
        code: "fgdb555",
        title: "title1",
        content: "content1",
        status: true
      },
      {
        id: 6,
        code: "fgdb666",
        title: "title2",
        content: "content2",
        status: false
      },
      {
        id: 7,
        code: "fgdb777",
        title: "title3",
        content: "content3",
        status: true
      },
      {
        id: 8,
        code: "fgdb888",
        title: "title4",
        content: "content4",
        status: false
      }
    ]
  };

  //Add cms blocks
  addCMSBlock = block => {
    const newBlock = {
      id: this.state.cmsBlocks.length + 1,
      code: block.code,
      title: block.title,
      content: block.content,
      status: block.status
    };

    this.setState({
      cmsBlocks: [newBlock, ...this.state.cmsBlocks]
    });
  };

  //delete an exsiting cms block.
  deleteBlock = id => {
    this.setState({
      cmsBlocks: this.state.cmsBlocks.filter(block => block.id !== id)
    });
  };

  //edit an exsiting cms block
  editCMSBlock = (id, data) => {
    this.setState({
      cmsBlocks: this.state.cmsBlocks.map(block => {
        if (block.id === id) {
          block = data;
        }
        return block;
      })
    });
  };

  render() {
    return (
      <div className="App">
        <AppBar />
        <div className="cmsContainer">
          <AddCMSBlock addCMSBlock={this.addCMSBlock} />
          <CMSBlocks
            cmsBlocks={this.state.cmsBlocks}
            deleteBlock={this.deleteBlock}
            editCMSBlock={this.editCMSBlock}
          />
        </div>
      </div>
    );
  }
}

export default App;
