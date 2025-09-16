const Directory = require('../models/Directory')

const createDirectory = async (req, res) => {
    try {
      const payloadData = req.body;
      const userId = req.user.id || 1;
  
      // Recursive function to create directories and their children
      const createDirectoriesRecursively = async (directory, parentId = null) => {
        // Create the directory, inject parentId if available
        const createdDirectory = await Directory.create({
          fileName: directory.fileName,
          isFile: directory.isFile,
          fileExtension: directory.fileExtension || null,
          parentId: parentId,  
          createdBy: userId,
          updatedBy: userId,
        });
  
        // If the directory has children, recursively create them
        if (directory.children && directory.children.length > 0) {
          for (const child of directory.children) {
            await createDirectoriesRecursively(child, createdDirectory.id); // Pass the current directory id as parentId for children
          }
        }
      };
  
      // Find the root directory in the payload
      const rootDirectory = payloadData.find((it) => it.isRoot);
      if (!rootDirectory) {
        throw new Error('Root directory not found in payload');
      }
  
      // Start the recursive creation from the root
      await createDirectoriesRecursively(rootDirectory);
  
      res.status(201).json({ message: "Directories created successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  
  const updateDirectory = async (req, res) => {
    try {
      const { id } = req.params;
      const directory = await Directory.findByPk(id);
  
      if (!directory || directory.createdBy !== req.user.id) {
        return res.status(404).json({ message: 'Directory not found or access denied' });
      }
  
      await directory.update({
        fileName: req.body.fileName,
        isFile: req.body.isFile,
        fileExtension: req.body.fileExtension,
        parentId: req.body.parentId || null,
        updatedBy: req.user.id,
      });
  
      res.status(200).json(directory);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

  const getDirectory = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (id) {
        const directory = await Directory.findOne({
          where: {
            id,
            createdBy: req.user.id || 1, 
          },
        });
        if (!directory) {
          return res.status(404).json({ message: 'Directory not found' });
        }
        return res.status(200).json(directory);
      }
  
      const directories = await Directory.findAll({
        where: {
          parentId: req.query.parentId || null,
          createdBy: req.user.id || 1, 
        },
      });
  
      res.status(200).json(directories);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const getDirectoryTree = async (directoryId, userId) => {
    const directory = await Directory.findOne({
      where: {
        id: directoryId,
        createdBy: userId || 1, 
      },
    });

    
  
    if (!directory) {
      return null;  
    }
  
    const childDirectories = await Directory.findAll({
      where: {
        parentId:  directoryId,  // Find directories where the current directory is their parent
        createdBy: userId || 1,
      },
    });

    console.log({childDirectories, directoryId});
    
  
    // If child directories are found, recursively get their children
    const children = await Promise.all(
      childDirectories.map(async (childDir) => {
        return await getDirectoryTree(childDir.id, userId);
      })
    );
  
    // Attach the children to the current directory object
    return {
      ...directory.dataValues,
      children: children.filter(child => child !== null),  // Filter out any nulls from missing directories
    };
  };
  
  // Controller for recursive directory fetch
  const getDirectoryById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Start the recursive fetching from the provided directory id
      const directoryTree = await getDirectoryTree(id, req.user.id);

      console.log({directoryTree});
      
  
      if (!directoryTree) {
        return res.status(404).json({ message: 'Directory not found or access denied' });
      }
  
      res.status(200).json(directoryTree);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  const getAllDirectoriesForUser = async (req, res) => {
    try {
      const { parentId } = req.query;
  
      // Fetch all directories for the user, optionally filtering by parentId
      const directories = await Directory.findAll({
        where: {
          parentId: parentId || null,  // If parentId is provided, filter by it
          createdBy: req.user.id || 1,  // Fetch only directories created by the logged-in user
        },
      });
  
      res.status(200).json(directories);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  const deleteDirectory = async (req, res) => {
    try {
      const { id } = req.params;
      const directory = await Directory.findOne({
        where: {
          id,
          createdBy: req.user.id || 1,  // Ensure user owns the directory
        },
      });
  
      if (!directory) {
        return res.status(404).json({ message: 'Directory not found or access denied' });
      }
  
      // Delete the directory
      await directory.destroy();
      res.status(204).json({ message: 'Directory deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
    module.exports = {
    createDirectory,
    getAllDirectoriesForUser,
    getDirectory,
    getDirectoryById,
    deleteDirectory,
    updateDirectory
    };
