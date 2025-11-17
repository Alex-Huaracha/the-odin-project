import prisma from '../db/prismaClient.js';

export const postFolder = async (req, res, next) => {
  try {
    const { folderName, parentId } = req.body;
    const userId = req.user.id;

    if (!folderName) {
      req.flash('error_msg', 'Folder name cannot be empty.');
      return res.redirect(parentId ? `/folders/${parentId}` : '/dashboard');
    }

    await prisma.folder.create({
      data: {
        name: folderName,
        userId: userId,
        parentId: parentId || null,
      },
    });

    req.flash('success_msg', 'Folder created successfully!');
    res.redirect(parentId ? `/folders/${parentId}` : '/dashboard');
  } catch (err) {
    return next(err);
  }
};

export const getFolderById = async (req, res, next) => {
  try {
    const folderId = req.params.id;
    const userId = req.user.id;

    const currentFolder = await prisma.folder.findUnique({
      where: {
        id: folderId,
        userId: userId,
      },
    });

    if (!currentFolder) {
      req.flash('error_msg', 'Folder not found.');
      return res.redirect('/dashboard');
    }

    const subFolders = await prisma.folder.findMany({
      where: {
        userId: userId,
        parentId: folderId,
      },
    });

    const files = await prisma.file.findMany({
      where: {
        userId: userId,
        folderId: folderId,
      },
    });

    res.render('folder', {
      user: req.user,
      currentFolder: currentFolder,
      folders: subFolders,
      files: files,
    });
  } catch (err) {
    return next(err);
  }
};
