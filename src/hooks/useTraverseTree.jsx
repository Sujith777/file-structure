const useTraverseTree = () => {
  function insertNode(tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder,
        items: [],
      });

      return tree;
    }

    let latestNode = [];
    latestNode = tree.items?.map((obj) => {
      return insertNode(obj, folderId, item, isFolder);
    });

    return { ...tree, items: latestNode };
  }

  function deleteNode(tree, folderId) {
    if (tree.id === folderId) {
      return null;
    }

    let filteredTree = [];
    filteredTree = tree.items
      ?.filter((item) => item.id !== folderId)
      .map((item) => deleteNode(item, folderId));

    return { ...tree, items: filteredTree };
  }

  function updateNode(tree, folderId, item) {
    if (tree.id === folderId) {
      tree.name = item;
      return tree;
    }

    let updatedItem = [];
    updatedItem = tree.items?.map((obj) => {
      return updateNode(obj, folderId, item);
    });

    return { ...tree, items: updatedItem };
  }

  return { insertNode, deleteNode, updateNode };
};

export default useTraverseTree;
