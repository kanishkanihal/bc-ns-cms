import React, { Component } from "react";
import axios from "axios";
import "./App.css";

import AppBar from "./components/AppBar";
import AddCMSBlock from "./components/AddCMSBlock";
import CMSBlocks from "./components/CMSBlocks";

class App extends Component {
  state = {
    cmsBlocks: []
  };

  componentWillMount = async () => {
    const responce = await axios.get("http://localhost:4000/api/cms");
    this.setState({
      cmsBlocks: responce.data
    });
  };

  //Add cms blocks
  addCMSBlock = async block => {
    const newBlock = {
      code: block.code,
      title: block.title,
      content: block.content,
      status: block.status,
      client_id: "1",
      page_id: "1",
      section_id: "1"
    };

    const responce = await axios.post(
      "http://localhost:4000/api/cms",
      newBlock
    );

    this.setState({
      cmsBlocks: [newBlock, ...this.state.cmsBlocks]
    });
  };

  //delete an exsiting cms block.
  deleteBlock = async id => {
    console.log("id", id);
    const responce = await axios.delete("http://localhost:4000/api/cms", {
      data: id
    });

    console.log("responce", responce);

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
