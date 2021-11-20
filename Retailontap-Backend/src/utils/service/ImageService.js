import { Image } from '../../../models';
import s3DeleteObject from '../s3DeleteObject';

export const createOrUpdateImage = async (
    imagable_type,
    imagable_id,
    thumbnail,
    parent_id,
    isMultiple
) => {
    const img = await Image.findOne({
        where: { imagable_id: imagable_id, imagable_type: imagable_type },
    });

    if (img && img.id && !isMultiple) {
        await s3DeleteObject(img.thumbnail).then(function (res, err) {
            //image deleted from s3
        });
        await Image.update(
            { imagable_type, imagable_id, thumbnail, parent_id },
            {
                where: { id: img.id },
            }
        );
    } else if (img && img.id) {
        await Image.update(
            { imagable_type, imagable_id, thumbnail, parent_id },
            {
                where: { id: img.id },
            }
        );
    } else {
        return await Image.create({
            imagable_type,
            imagable_id,
            thumbnail,
            parent_id,
        }).then((image) => {
            return image;
        });
    }
};

export const createImage = async (
    imagable_type,
    imagable_id,
    thumbnail,
    parent_id
) => {
    return await Image.create({
        imagable_type,
        imagable_id,
        thumbnail,
        parent_id,
    }).then((image) => {
        return image;
    });
};
