import { useState } from "react";

const Folder = ({
  explorer,
  handleInsertNode,
  handleDeleteNode,
  handleUpdateNode,
}) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const [showEdit, setShowEdit] = useState(false);

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  const onDeleteFolder = () => {
    handleDeleteNode(explorer.id);
  };

  const handleEditFolder = (e) => {
    e.stopPropagation();
    setExpand(true);
    setShowEdit(true);
  };

  const onEditFolder = (e, isFolder) => {
    if (e.keyCode === 13 && e.target.value) {
      handleUpdateNode(explorer.id, e.target.value, showInput.isFolder);
      setShowEdit(false);
    }
  };

  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div className="folder">
          <span onClick={() => setExpand((prev) => !prev)}>
            📁 {explorer.name}
          </span>
          <div className="actions">
            <button onClick={onDeleteFolder}>🗑️</button>
            <button onClick={(e) => handleEditFolder(e)}>✎</button>
            <button onClick={(e) => handleNewFolder(e, true)}> + 📁</button>
            <button onClick={(e) => handleNewFolder(e, false)}> + 📄</button>
          </div>
        </div>

        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                type="text"
                autoFocus
                onKeyDown={onAddFolder}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                className="inputContainer__input"
              />
            </div>
          )}

          {showEdit && (
            <div className="inputContainer">
              <input
                type="text"
                autoFocus
                onKeyDown={onEditFolder}
                onBlur={() => setShowEdit(false)}
                className="inputContainer__input"
              />
            </div>
          )}

          {explorer.items.map((exp) => {
            return (
              <Folder
                key={exp.id}
                explorer={exp}
                handleInsertNode={handleInsertNode}
                handleDeleteNode={handleDeleteNode}
                handleUpdateNode={handleUpdateNode}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="file">
        <span>📄 {explorer.name}</span>
        <div className="actions">
          <button onClick={onDeleteFolder}>🗑️</button>
          <button onClick={(e) => handleEditFolder(e)}>✎</button>
        </div>
      </div>
    );
  }
};

export default Folder;
