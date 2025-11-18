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
