import prisma from '../db/prismaClient.js';

export const createShareLink = async (req, res, next) => {
  try {
    const folderId = req.params.id;
    const userId = req.user.id;

    const { duration } = req.body;
    const days = parseInt(duration) || 1;

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + days);

    const newLink = await prisma.shareLink.create({
      data: {
        folderId: folderId,
        userId: userId,
        expiresAt: expiresAt,
      },
    });

    const protocol = req.protocol;
    const host = req.get('host');
    const shareUrl = `${protocol}://${host}/share/${newLink.id}`;

    req.flash(
      'success_msg',
      `Link generated! Copy this: ${shareUrl} (Valid for ${days} days)`
    );

    res.redirect(`/folders/${folderId}`);
  } catch (err) {
    return next(err);
  }
};

export const getShareLink = async (req, res, next) => {
  try {
    const shareId = req.params.id;

    const shareLink = await prisma.shareLink.findUnique({
      where: { id: shareId },
      include: {
        folder: true,
        user: true,
      },
    });

    if (!shareLink) {
      return res.render('share-error', {
        message: 'Este link no existe o es inválido.',
      });
    }

    if (new Date() > shareLink.expiresAt) {
      return res.render('share-error', { message: 'Este link ha expirado.' });
    }

    const folders = await prisma.folder.findMany({
      where: { parentId: shareLink.folderId },
    });

    const files = await prisma.file.findMany({
      where: { folderId: shareLink.folderId },
    });

    res.render('share-public', {
      shareLink: shareLink,
      folder: shareLink.folder,
      owner: shareLink.user,
      folders: folders,
      files: files,
    });
  } catch (err) {
    return next(err);
  }
};
